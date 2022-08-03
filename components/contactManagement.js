import Image from "next/image";
import styles from "../styles/components/contactManagement.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Queries(props) {
  const { data } = props;
  const [fillUPArray, setFillUpArray] = useState([]);
  const fillUp = () => {
    var array = [];
    if (data.length < 12) {
      for (var i = 0; i < 12 - data.length; i++) {
        array.push({
          "First Name": "",
          "Last Name": "",
          "Phone number": "",
          Emails: "",
          Country: "",
          Status: "",
          Comments: "",
          "User name": "",
          "Date of Joining": "",
          Roles: "",
        });
      }
    }
    setFillUpArray(array);
  };

  useEffect(() => {
    fillUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.header}>
          Contact Management - Queries (New, In Progress, Resolved)
        </div>
        <section className={styles.table__container}>
          <table className={styles.table}>
            <thead style={{ backgroundColor: "#CCCCCC" }}>
              <tr className={styles.table__head}>
                <td style={{ fontWeight: 700, color: "#293986" }}>Name</td>
                <td className={styles.table__cell}>Role</td>
                <td className={styles.table__cell}>Email</td>
                <td className={styles.table__cell}>Phone Number</td>
                <td className={styles.table__cell}>Country</td>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr
                    className="table__row"
                    key={index}
                    style={{ backgroundColor: index % 2 ? "white" : "#DDDDDD" }}
                  >
                    <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                    <td className={styles.table__cell}>{row["Roles"]}</td>
                    <td className={styles.table__cell}>{row["Emails"]}</td>
                    <td className={styles.table__cell}>
                      {row["Phone number"]}
                    </td>
                    <td className={styles.table__cell}>{row["Country"]}</td>
                  </tr>
                );
              })}
              {fillUPArray.map((row, index) => {
                return (
                  <tr
                    className="table__row"
                    key={index}
                    style={{ backgroundColor: index % 2 ? "#DDDDDD" : "white" }}
                  >
                    <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                    <td className={styles.table__cell}>{row["Roles"]}</td>
                    <td className={styles.table__cell}>{row["Emails"]}</td>
                    <td className={styles.table__cell}>
                      {row["Phone number"]}
                    </td>
                    <td className={styles.table__cell}>{row["Country"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <div className={styles.pagination}>
          <button
            className={styles.back}
            style={{
              backgroundColor: "#6FA8DC",
              width: "4em",
              borderLeft: "2px solid black",
            }}
          >
            {"<<"}
          </button>
          <button className={styles.back}>{"<"}</button>
        </div>
      </div>
    </div>
  );
}
