import Image from "next/image";
import styles from "../styles/components/dashboard.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function Dashboard(props) {
  const { data, viewQuery } = props;
  const keys = Object.keys(data);

  return (
    <div className={styles.container}>
      <div className={styles.queries}>
        {keys.map((key, id) => {
          return (
            <div className={styles.query__container} key={id}>
              <div className={styles.query__box} onClick={() => viewQuery(key)}>
                {data[key].length}
              </div>
              <label className={styles.query__status}>{key}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
