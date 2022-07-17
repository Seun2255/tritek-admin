import styles from "../styles/components/viewQuery.module.css";
import { addQuery } from "../pages/api/API";

export default function ViewQuery(props) {
  const { data, setViewQuery, setReplyQuery, queryId, queries } = props;

  const handleReply = () => {
    setViewQuery(false);
    setReplyQuery(true);
  };

  const handleEscalate = () => {};

  const handleResolve = () => {
    data["Status"] = "Resolved";
    addQuery({ ...data, Status: "Resolved" }, data["Query Number"]).then(() => {
      setViewQuery(false);
    });
  };

  return (
    <div className={styles.outer}>
      <div className={styles.back__button} onClick={() => setViewQuery(false)}>
        Back
      </div>
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
