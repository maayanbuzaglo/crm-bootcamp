import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const VerticalBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9991//dashboard/getProductsTypesDetails/")
      .then((result) => {
        const res = result.data.dashboard;
        const sum = res.reduce((a, v) => (a = a + Number(v.numOfType)), 0); //The 100% of all the ordered product type.
        const relativeNumOfType = [];
        res.map((productType) => {
          relativeNumOfType.push((Number(productType.numOfType) / sum) * 100);
          return 1;
        });
        setData(relativeNumOfType);
      })
      .catch((err) => {});
  }, []);

  const dashboardData = {
    labels: ["Breakfast", "Lunch", "Dinner"],
    datasets: [
      {
        label: "% of Ordered Product Type",
        data: data,
        backgroundColor: [
          "rgb(223, 242, 254, 1)",
          "rgb(206, 220, 255, 1)",
          "rgb(254, 204, 225)",
        ],
        borderColor: [
          "rgb(223, 242, 254, 1)",
          "rgb(206, 220, 255, 1)",
          "rgb(254, 204, 225)",
        ],
        borderWidth: 1,
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
      <Bar data={dashboardData} options={options} />
    </div>
  );
};

export default VerticalBar;
