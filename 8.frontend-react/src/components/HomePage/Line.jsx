import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9991//dashboard/getWeekOrdersDetails/", { id })
      .then((result) => {
        const res = result.data.dashboard;
        const daysOrders = [0, 0, 0, 0, 0, 0, 0];
        res.map((order) => {
          daysOrders[order.day - 1] = Number(order.numOfOrders);
          return 1;
        });
        setData(daysOrders);
      })
      .catch((err) => {});
  }, []);

  const dashboardData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    datasets: [
      {
        label: "# of Orders",
        data: data,
        fill: false,
        backgroundColor: "rgb(252, 225, 206, 0.2)",
        borderColor: "rgb(252, 225, 206, 0.8)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div
      style={{
        width: "550px",
        height: "300px",
        backgroundColor: "white",
        boxShadow: "5px 5px 8px #888888",
      }}
    >
      <Line data={dashboardData} options={options} />
    </div>
  );
};

export default LineChart;
