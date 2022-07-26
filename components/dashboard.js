import Image from "next/image";
import styles from "../styles/components/dashboard.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Dashboard(props) {
  const { data, viewQuery, setCurrentQueries } = props;
  const keys = Object.keys(data);

  const barData = {
    labels: ["New/Resolved Tickets"],
    datasets: [
      {
        label: "New tickets",
        data: [data["New"].length],
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "In Progress tickets",
        data: [data["in Progress"].length],
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Resolved tickets",
        data: [data["Resolved"].length],
        backgroundColor: "purple",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.queries}>
        {keys.map((key, id) => {
          return (
            <div className={styles.query__container} key={id}>
              <div
                className={styles.query__box}
                onClick={() => {
                  viewQuery(key);
                  setCurrentQueries(data[key]);
                }}
              >
                {data[key].length}
              </div>
              <label className={styles.query__status}>{key}</label>
            </div>
          );
        })}
      </div>
      <div className={styles.chart__container}>
        <div className={styles.bar__chart}>
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
}
