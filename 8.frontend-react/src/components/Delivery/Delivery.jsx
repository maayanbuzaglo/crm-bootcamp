import Moment from "moment";
import styles from "./Delivery.module.scss";

const Delivery = ({ name, address, time, payment, status }) => {
  return (
    <div className={styles.deliveries}>
      <div>
        <h1>{Moment(time).format("MMMM Do YYYY")}</h1>
      </div>
      <div>
        <h4>{name}</h4>
        <h4>{address}</h4>
        <h4>{Moment(time).format("HH:mm")}</h4>
        {status === 1 ? (
          <h4 style={{ color: "green", fontSize: "22px" }}>{payment}</h4>
        ) : (
          <h4 style={{ color: "red", fontSize: "22px" }}>{payment}</h4>
        )}
      </div>
    </div>
  );
};

export default Delivery;
