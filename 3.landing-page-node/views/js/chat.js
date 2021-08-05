var socket = io("http://localhost:2200");
var messages = document.getElementById("messages");
var form = document.getElementById("chat-form");
var input = document.getElementById("chat-input");
var typing = document.getElementById("typing");

let id = "";
let conversation = [];

/**
 * This function creates a message on the chat.
 */
const createMessage = (tmpMessage) => {
  //If message send to me - message grey and right.
  if (!tmpMessage.isCrmSender) {
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.margin = "10px";

    var item = document.createElement("div");
    item.textContent = tmpMessage.message;
    item.style.color = "white";
    item.style.backgroundColor = "#002c9b";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";

    var date = document.createElement("div");
    var dateTmp = new Date(tmpMessage.date);
    date.textContent =
      tmpMessage.date.split(" ")[1] +
      " " +
      tmpMessage.date.split(" ")[2] +
      " " +
      dateTmp.getHours() +
      ":" +
      dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "4px";

    div.appendChild(item);
    div.appendChild(date);
    messages.appendChild(div);
    //If I send the message - message blue and left.
  } else {
    typing.style.display = "none";

    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.margin = "10px";

    var item = document.createElement("div");
    item.textContent = tmpMessage.message;
    item.style.color = "white";
    item.style.backgroundColor = "grey";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";

    var date = document.createElement("div");
    var dateTmp = new Date(tmpMessage.date);
    date.textContent =
      tmpMessage.date.split(" ")[1] +
      " " +
      tmpMessage.date.split(" ")[2] +
      " " +
      dateTmp.getHours() +
      ":" +
      dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginRight = "4px";

    div.appendChild(date);
    div.appendChild(item);
    messages.appendChild(div);
  }
};

/**
 * This function gets all the conversation when the page reload.
 * It gets the room from local storage.
 */
const onRender = () => {
  const room = window.localStorage.getItem("room");
  axios
    .post("http://localhost:9090/chat/clientMessages", {
      email: room,
    })
    .then(function (response) {
      conversation = response.data.messages;
      for (message in conversation) {
        tmpMessage = conversation[message];
        createMessage(tmpMessage);
      }
    })
    .catch(function () {});
  scroll();
};

/**
 * This function listen to send button,
 * and send the input message to the crm.
 */
form.addEventListener("submit", function (e) {
  console.log(messages.scrollHeight);

  e.preventDefault();
  if (input.value) {
    if (!window.localStorage.getItem("room")) {
      window.localStorage.setItem("room", input.value);
    }
    id = window.localStorage.getItem("room");
    socket.emit("join-room", id);
    socket.emit("send-message", input.value, id);
    input.value = "";
  }
});

//First message for email request:
let messagesArr = ["Please write your mail to start..."];
var div = document.createElement("div");
div.style.display = "flex";
div.style.justifyContent = "flex-end";
div.style.margin = "10px";
var item = document.createElement("div");
item.textContent = messagesArr[0];
item.style.color = "white";
item.style.backgroundColor = "grey";
item.style.padding = "10px";
item.style.borderRadius = "10px";
div.appendChild(item);
messages.appendChild(div);

socket.on("receive-message", (msg) => {
  //If message send to me - message grey and right.
  if (!msg.isCrmSender) {
    console.log(msg);
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.margin = "10px";
    var item = document.createElement("div");
    item.textContent = msg.message;
    item.style.color = "white";
    item.style.backgroundColor = "#002c9b";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";
    var date = document.createElement("div");
    var dateTmp = new Date(Date.now());
    date.textContent = dateTmp.getHours() + ":" + dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "4px";

    div.appendChild(item);
    div.appendChild(date);
    messages.appendChild(div);
    //If I send the message - message blue and left.
  } else {
    typing.style.display = "none";
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.margin = "10px";
    var item = document.createElement("div");
    item.textContent = msg.message;
    item.style.color = "white";
    item.style.backgroundColor = "grey";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";
    var date = document.createElement("div");
    var dateTmp = new Date(Date.now());
    date.textContent = dateTmp.getHours() + ":" + dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginRight = "4px";

    div.appendChild(date);
    div.appendChild(item);
    messages.appendChild(div);
  }
  scroll();
});

/**
 * This  function scroll to last message in chat.
 */
const scroll = () => {
  messages.scrollTop = messages.scrollHeight;
};

/**
 * This function listen to click event,
 * and when click on chat - scroll to last message.
 */
window.addEventListener("click", function () {
  messages.scrollTop = messages.scrollHeight;
});

/**
 * This function handles typing message while the client is typing.
 */
input.onchange = () => {
  socket.emit("client-typing", id);
};

/**
 * This function handles typing message while the crm is typing.
 */
socket.on("crm-typing", (type) => {
  if (type) typing.style.display = "block";
  else typing.style.display = "none";
});

/**
 * This functions handles the open and close of the chat box
 */
function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("openBtn").style.display = "none";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("openBtn").style.display = "block";
}
