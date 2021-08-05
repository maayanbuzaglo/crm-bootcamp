import styles from "./Chat.module.scss";
import Moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";

const Conversation = ({ data, id }) => {
  const messages = data;
  const selectedSocketId = id;

  return (
    <ScrollToBottom className={styles.chatMessages}>
      <ul>
        {selectedSocketId &&
          messages[selectedSocketId].messages.map((message) =>
            message.isCrmSender ? (
              <div className={styles.myMessage}>
                <p
                  style={{
                    backgroundColor: "#002c9b",
                  }}
                >
                  {message.message}
                </p>
                <h4>{Moment(message.date).format("DD MMM HH:mm")}</h4>
              </div>
            ) : (
              <div className={styles.message}>
                <h4>{Moment(message.date).format("DD MMM HH:mm")}</h4>
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
    </ScrollToBottom>
  );
};

export default Conversation;
