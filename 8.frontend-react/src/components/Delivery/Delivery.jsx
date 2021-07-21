import Moment from "moment";
import styles from "./Delivery.module.scss";

const Delivery = ({ name, address, time, payment }) => {
  console.log(name);
  return (
    <div className={styles.deliveries}>
      <div>
        <h1>{Moment(time).format("MMMM Do YYYY")}</h1>
      </div>
      <div>
        <h4>{name}</h4>
        <h4>{address}</h4>
        <h4>{Moment(time).format("HH:mm")}</h4>
        <h4>{payment}</h4>
      </div>
    </div>
  );
};

export default Delivery;
