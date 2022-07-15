import styles from "../styles/components/viewQuery.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function ViewQuery(props) {
  const { data, setViewQuery, setReplyQuery } = props;

  const handleReply = () => {
    setViewQuery(false);
    setReplyQuery(true);
  };

  const handleEscalate = () => {};

  const handleResolve = () => {};

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.header}>{`${data["First Name"]} Query`}</div>
        <section className={styles.query}>{data["Comments"]}</section>
        <div className={styles.base}></div>
      </div>
      <div className={styles.action__buttons}>
        <button className={styles.action__button} onClick={handleReply}>
          Reply
        </button>
        <button className={styles.action__button} onClick={handleEscalate}>
          Escalate
        </button>
        <button className={styles.action__button} onClick={handleResolve}>
          Resolve
        </button>
      </div>
    </div>
  );
}
