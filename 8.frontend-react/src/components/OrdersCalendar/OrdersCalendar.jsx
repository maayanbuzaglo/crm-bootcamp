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
          const data = result.data.orders;
          setEvents(
            data.map((event) => ({
              id: event.id,
              title:
                event.client_name.split(" ")[0].charAt(0).toUpperCase() +
                event.client_name.split(" ")[0].slice(1) +
                " " +
                event.client_name.split(" ")[1].charAt(0).toUpperCase() +
                event.client_name.split(" ")[1].slice(1),
              start: new Date(event.date),
              end: new Date(event.date),
            }))
          );
        })
        .catch((err) => {});
    })();
  }, []);

  const eventPropGetter = () => {
    return {
      style: {
        border: "none",
        backgroundColor: "lightBlue", //this works
        color: "black",
      },
    };
  };

  const onSelectEvent = (e) => {
    const order_id = e.id;
    window.location.href = `http://localhost:3000/updateOrder?id=${order_id}&from=ordersCalendar`;
  };

  return (
    <div>
      <NavBar />
      <Calendar
        style={{
          margin: "5%",
          fontFamily: "optima",
          fontSize: "100%",
          height: 700,
          zIndex: -1,
        }}
        views={["month", "week", "day"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        onSelectEvent={(e) => onSelectEvent(e)}
      />
    </div>
  );
};

export default OrdersCalendar;
