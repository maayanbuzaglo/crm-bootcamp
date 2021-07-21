import React, { useState, useEffect } from "react";
import axios from "axios";
import Delivery from "../Delivery/Delivery";
import NavBar from "../NavBar/NavBar";
import styles from "./DeliveriesDetails.module.scss";

const DeliveriesDetails = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const [orders, setOrders] = useState([]);

  //Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      await axios
        .post("http://localhost:9991//orders/getOrdersDetails/", {
          delivery_person_id: id,
        })
        .then((result) => {
          const ordersDetails = result.data.orders;
          setOrders(ordersDetails);
        })
        .catch((err) => {});
    })();
  }, []);

  console.log(orders);

  return (
    <div>
      <NavBar userType="delivery person" />
      <div className={styles.deliveries}>
        <h5>YOUR UPCOMING ORDERS</h5>
        <div className={styles.types}>
          {orders.map((order) => {
            return (
              <Delivery
                name={order.first_name + " " + order.last_name}
                address={order.location}
                time={order.date}
                payment={order.total_price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveriesDetails;