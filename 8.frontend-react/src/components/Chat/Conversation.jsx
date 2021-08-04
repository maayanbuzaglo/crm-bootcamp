import styles from "./Chat.module.scss";
import Moment from "moment";

const Conversation = ({ data, id }) => {
  const messages = data;

  const selectedSocketId = id;
  return (
    <ul>
      {selectedSocketId &&
        messages[selectedSocketId].messages.map((message) =>
          message.isCrmSender ? (
            <div className={styles.myMessage} key={message.message}>
              <p
                style={{
                  backgroundColor: "#002c9b",
                }}
              >
                {message.message}
              </p>
              <h4>{Moment(message.date).format("DD MMM HH:hh")}</h4>
            </div>
          ) : (
            <div className={styles.message} key={message.message}>
              <h4>{Moment(message.date).format("DD MMM HH:hh")}</h4>
              <p
                style={{
                  backgroundColor: "grey",
                }}
              >
                {message.message}
              </p>
            </div>
          )
        )}
    </ul>
  );
};

export default Conversation;