import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const PieChart = ({ id }) => {
  const [deliveriesPersonsName, setDeliveriesPersonsName] = useState([]);
  const [deliveriesNumber, setDeliveriesNumber] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9991//dashboard/getDeliveriesDayDetails/", { id })
      .then((result) => {
        const res = result.data.dashboard;
        const names = []; //Deliveries persons name.
        const deliveriesNum = []; //Num of orders of every deliveries person.
        res.map((user) => {
          names.push(user.deliveryPersonName);
          deliveriesNum.push(user.numOfDeliveries);
          return 1;
        });
        setDeliveriesPersonsName(names);
        setDeliveriesNumber(deliveriesNum);
      })
      .catch((err) => {});
  }, [id]);

  const dashboardData = {
    labels: deliveriesPersonsName,
    datasets: [
      {
        label: "# of Deliveries",
        data: deliveriesNumber,
        backgroundColor: [
          "rgb(254, 204, 225, 0.8)",
          "rgb(223, 242, 254, 0.8)",
          "rgb(252, 225, 206, 0.8)",
          "rgb(205, 253, 225, 0.8)",
          "rgb(206, 220, 255, 0.8)",
        ],
        borderColor: [
          "rgb(254, 204, 225, 1)",
          "rgb(223, 242, 254, 1)",
          "rgb(252, 225, 206, 1)",
          "rgb(205, 253, 225, 1)",
          "rgb(206, 220, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        backgroundColor: "white",
        boxShadow: "5px 5px 8px #888888",
      }}
    >
      <Pie data={dashboardData} />
    </div>
  );
};

export default PieChart;
