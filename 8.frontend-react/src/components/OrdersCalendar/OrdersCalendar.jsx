import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const OrdersCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  //Using useEffect to call the API once mounted and set the data.
  useEffect(() => {
    (async () => {
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//orders/getOrders/", { account_id })
        .then((result) => {
          setEvents(
            result.data.orders.map((event) => ({
              title: event.client_name.toUpperCase(),
              start: event.date,
              end: event.date,
            }))
          );
        })
        .catch((err) => {});
    })();
  }, []);

  return (
    <div>
      <NavBar />
      <Calendar
        style={{
          margin: "5%",
          fontFamily: "optima",
          fontSize: "100%",
          height: 600,
          zIndex: -1,
        }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default OrdersCalendar;
