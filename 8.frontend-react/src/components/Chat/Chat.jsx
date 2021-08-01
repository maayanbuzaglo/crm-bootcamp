import React, { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Contacts from "./Contacts";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./Chat.module.scss";
import { io } from "socket.io-client";
import Conversation from "./Conversation";

const socket = io("http://localhost:2000");

const Chat = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [selectedSocketId, setSelectedSocketId] = useState("");
  const [senderName, setSenderName] = useState();
  const [typing, setTyping] = useState({ socketId: "", isTyping: false });
  const [firstMessage, setFirstMessage] = useState(true);

  const [form, setForm] = useState({
    first_name: {
      value: "",
      isInvalid: false,
    },
    last_name: {
      value: "",
      isInvalid: false,
    },
    phone: {
      value: "",
      isInvalid: false,
    },
    email: {
      value: "",
      isInvalid: false,
      isExist: false,
    },
    address: {
      value: "",
      isInvalid: false,
    },
    account_token: {
      value: "",
    },
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const addClient = () => {
    const formattedForm = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      account_id: window.localStorage.getItem("account_id"),
    };
    axios
      .post("http://localhost:9991//clients/addClient/", {
        form: formattedForm,
      })
      .then(function (response) {
        const invalid = response.data; //All the invalid input data.

        if (invalid) {
          //If the client is already exist.
          if (invalid[0] === "exist") {
            setForm((prevForm) => ({
              ...prevForm,
              email: {
                value: prevForm["email"].value,
                isExist: true,
              },
            }));
          } else if (invalid) {
            invalid.forEach((invalidInput) => {
              setForm((prevForm) => ({
                ...prevForm,
                [invalidInput]: {
                  value: prevForm[invalidInput].value,
                  isInvalid: true,
                },
              }));
            });
          }
        }
        if (invalid.length === 0) {
          setState({ isPaneOpenLeft: false });
          setForm({
            ...form,
            first_name: { value: "", isInvalid: false },
            last_name: { value: "", isInvalid: false },
            phone: { value: "", isInvalid: false },
            email: { value: "", isInvalid: false },
            address: { value: "", isInvalid: false },
          });
        }
      })
      .catch(function () {});
  };

  const isTyping = (e) => {
    setInputMessage(e.target.value);
    console.log(selectedSocketId);
    socket.emit("crm-typing", selectedSocketId);
  };
  console.log(messages);

  useEffect(() => {
    const tmpMessages = {};
    axios.get("http://localhost:9090/chat/allMessages").then((res) => {
      for (var key in res.data) {
        tmpMessages[res.data[key].socketId] = {
          name: res.data[key].socketId,
          messages: res.data[key].messages,
        };
      }
      console.log(tmpMessages);
      setMessages(tmpMessages);
    });

    socket.emit("join-room", "crm");

    socket.on("client-typing", (socketId) => {
      setTyping({ socketId: socketId, isTyping: true });
    });

    socket.on("receive-message", (msg) => {
      let id = "";
      //First message = client mail - checks if exists and takes details.
      if (firstMessage) {
        (async () => {
          await axios
            .post("http://localhost:9991//clients/getClientByMail/", {
              email: msg.message,
            })
            .then(function (response) {
              setMessagesHelp(msg, id, response.data.client[0].name);
            })
            .catch(function () {
              setMessagesHelp(msg, id, msg.message);
            });
          setFirstMessage(false);
        })();
      } else {
        setMessages((prevMessages) => {
          let tmpMessages = null;
          //If there is a conversation with the sender.
          if (prevMessages[msg.senderId]) {
            tmpMessages = { ...prevMessages };
            tmpMessages[msg.senderId].messages.push({
              message: msg.message,
              isCrmSender: msg.isCrmSender,
            });
            id = msg.senderId;
            //If there is a conversation with the sender.
          } else if (prevMessages[msg.receiverId]) {
            tmpMessages = { ...prevMessages };
            tmpMessages[msg.receiverId].messages.push({
              message: msg.message,
              isCrmSender: msg.isCrmSender,
            });
            id = msg.receiverId;
            //If this is a new conversation.
          } else {
            tmpMessages = {
              ...prevMessages,
              [msg.message]: {
                name: senderName,
                messages: [
                  { message: msg.message, isCrmSender: msg.isCrmSender },
                ],
              },
            };
            id = msg.senderId;
          }
          return tmpMessages;
        });
        setSelectedSocketId(id);
      }
    });
  }, []);

  const setMessagesHelp = (msg, id, name) => {
    setMessages((prevMessages) => {
      let tmpMessages = null;
      //If there is a conversation with the sender.
      if (prevMessages[msg.senderId]) {
        tmpMessages = { ...prevMessages };
        tmpMessages[msg.senderId].messages.push({
          message: msg.message,
          isCrmSender: msg.isCrmSender,
        });
        id = msg.senderId;
        //If there is a conversation with the sender.
      } else if (prevMessages[msg.receiverId]) {
        tmpMessages = { ...prevMessages };
        tmpMessages[msg.receiverId].messages.push({
          message: msg.message,
          isCrmSender: msg.isCrmSender,
        });
        id = msg.receiverId;
        //If this is a new conversation.
      } else {
        tmpMessages = {
          ...prevMessages,
          [msg.message]: {
            name: name,
            messages: [{ message: msg.message, isCrmSender: msg.isCrmSender }],
          },
        };
        socket.emit("send-message-crm", {
          message: `Hey ${name.split(" ")[0]}, how can I help you?`,
          isCrmSender: true,
          receiverId: msg.senderId,
        });
        id = msg.senderId;
      }
      return tmpMessages;
    });
    setSenderName(name);
    setSelectedSocketId(id);
  };

  const onSubmit = () => {
    //Sends the message to server.
    socket.emit("send-message-crm", {
      message: inputMessage,
      receiverId: selectedSocketId,
    });
    setInputMessage("");
  };

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.chatBar}>
          <div className={styles.chatBarLeft}>
            <Button
              text="New Client +"
              onClick={() => setState({ isPaneOpenLeft: true })}
              extraStyles={{
                width: "110px",
                fontSize: "12px",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "10px",
              }}
            />
          </div>
          <div className={styles.chatBarRight}>
            <h4>{senderName} | Client</h4>
            <h5>
              {typing.isTyping &&
                messages[typing.socketId] &&
                messages[typing.socketId].name + " is typing..."}
            </h5>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.messages}>
            <Contacts
              data={messages}
              func={setSelectedSocketId}
              func2={setSenderName}
            />
          </div>
          <div className={styles.chat}>
            <div className={styles.chatMessages}>
              <Conversation data={messages} id={selectedSocketId} />
            </div>
            <div className={styles.sendMessage}>
              <Input
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => isTyping(e)}
                extraStyle={{
                  width: "600px",
                  height: "50px",
                  margin: 0,
                  marginLeft: "20px",
                }}
              />
              <Button
                text="Send Text"
                extraStyles={{ width: "100px", margin: 0, marginLeft: "20px" }}
                onClick={() => onSubmit()}
              />
            </div>
          </div>
        </div>
        <div>
          <SlidingPane
            closeIcon={<h4>Close</h4>}
            isOpen={state.isPaneOpenLeft}
            from="right"
            width="400px"
            onRequestClose={() => setState({ isPaneOpenLeft: false })}
          >
            <div className={styles.addClient}>
              <h4>ADD CLIENT</h4>
              <Input
                placeholder="First name"
                type="text"
                value={form.first_name.value}
                name={"first_name"}
                isInvalid={form.first_name.isInvalid}
                text={form.first_name.value ? null : "First name is required."}
                onChange={onChange}
              />
              <Input
                placeholder="Last name"
                type="text"
                value={form.last_name.value}
                name={"last_name"}
                isInvalid={form.last_name.isInvalid}
                text={form.last_name.value ? null : "Last name is required."}
                onChange={onChange}
              />
              <Input
                placeholder="Phone number"
                type="phone"
                value={form.phone.value}
                name={"phone"}
                isInvalid={form.phone.isInvalid}
                text={
                  form.phone.value
                    ? "Invalid phone number."
                    : "A phone number is required."
                }
                onChange={onChange}
              />
              <Input
                placeholder="Email address"
                type="email"
                value={form.email.value}
                name={"email"}
                isExist={form.email.isExist}
                textExist={"Account already exists"}
                isInvalid={form.email.isInvalid}
                text={
                  form.email.value
                    ? "Invalid email address."
                    : "An email address is required."
                }
                onChange={onChange}
              />
              <Input
                placeholder="Address"
                type="address"
                value={form.address.value}
                name={"address"}
                isInvalid={form.address.isInvalid}
                text={form.address.value ? null : "An address is required."}
                onChange={onChange}
              />
              <Button text="Add Client" onClick={addClient} />
            </div>
          </SlidingPane>
        </div>
      </div>
    </div>
  );
};

export default Chat;
