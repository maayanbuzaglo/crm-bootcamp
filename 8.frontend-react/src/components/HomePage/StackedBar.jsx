import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const StackedBar = ({ id }) => {
  const [todayTotal, setTodayTotal] = useState([]); //Today total sales.
  const [lastWeekTotal, setLastWeekTotal] = useState([]); //This day last week total sales.

  useEffect(() => {
    axios
      .post("http://localhost:9991//dashboard/getTodayTotalSales/", { id })
      .then((result) => {
        const res = result.data.dashboard;
        const todayTotalTmp = [];
        todayTotalTmp.push(res[0].todayTotalSales);
        setTodayTotal(todayTotalTmp);
      })
      .catch((err) => {});

    axios
      .post("http://localhost:9991//dashboard/getLastWeekTotalSales/", { id })
      .then((result) => {
        const res = result.data.dashboard;
        const setLastWeekTotalTmp = [];
        setLastWeekTotalTmp.push(res[0].lastWeekTotalSales);
        setLastWeekTotal(setLastWeekTotalTmp);
      })
      .catch((err) => {});
  }, []);

  const dashboardData = {
    labels: ["Sales"],
    datasets: [
      {
        label: "$ of Today",
        data: todayTotal,
        backgroundColor: "rgb(223, 242, 254, 1)",
      },
      {
        label: "$ of Last Week",
        data: lastWeekTotal,
        backgroundColor: "rgb(206, 220, 255, 1)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
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
      <Bar data={dashboardData} options={options} />
    </div>
  );
};

export default StackedBar;
