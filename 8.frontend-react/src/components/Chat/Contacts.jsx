import styles from "./Chat.module.scss";

const Contacts = ({ data, func, func2 }) => {
  const messages = data;
  return (
    <div>
      {Object.keys(messages).map((socketId) => (
        <div
          tabIndex="1"
          key={socketId}
          className={styles.messageBorder}
          onClick={() => {
            func(socketId);
            func2(messages[socketId].name);
          }}
        >
          <h3>{messages[socketId].name[0]}</h3>
          <div className={styles.message} key={socketId.name}>
            <h1>{messages[socketId].name}</h1>
            <h2>
              {
                messages[socketId].messages[
                  messages[socketId].messages.length - 1
                ].message
              }
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
