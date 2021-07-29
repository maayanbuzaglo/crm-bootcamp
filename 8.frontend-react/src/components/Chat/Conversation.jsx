import styles from "./Chat.module.scss";

const Conversation = ({ data, id }) => {
  const messages = data;

  const selectedSocketId = id;
  return (
    <ul>
      {selectedSocketId &&
        messages[selectedSocketId].messages.map((message) =>
          message.isCrmSender ? (
            <div className={styles.myMassage}>
              <p
                style={{
                  backgroundColor: "#002c9b",
                }}
              >
                {message.message}
              </p>
            </div>
          ) : (
            <div className={styles.massage}>
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
