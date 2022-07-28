import Image from "next/image";
import styles from "../../styles/components/User Management/permissions.module.css";
import { useState, useEffect } from "react";
import { setPermissions, getPermissions } from "../../pages/api/API";

export default function Permissions() {
  const [data, setData] = useState([]);

  const createTable = (data) => {
    var rows = [];
    var dataManagentKeys = Object.keys(data["Data Management"]["Admin Staff"]);
    var internalSharingKeys = Object.keys(
      data["Internal Sharing"]["Admin Staff"]
    );
    var activeUserKeys = Object.keys(data["Active User"]["Admin Staff"]);
    var accessManagementKeys = Object.keys(
      data["Access Management"]["Admin Staff"]
    );

    rows.push(["Data Management", "null", "null", "null", "null"]);
    dataManagentKeys.map((key) => {
      rows.push([
        key,
        data["Data Management"]["Admin Staff"][key],
        data["Data Management"]["ICT Dept"][key],
        data["Data Management"]["Admin Manager"][key],
        data["Data Management"]["Sales/Marketing"][key],
      ]);
    });
    rows.push(["null", "null", "null", "null", "null"]);
    rows.push(["Internal Sharing", "null", "null", "null", "null"]);
    internalSharingKeys.map((key) => {
      rows.push([
        key,
        data["Internal Sharing"]["Admin Staff"][key],
        data["Internal Sharing"]["ICT Dept"][key],
        data["Internal Sharing"]["Admin Manager"][key],
        data["Internal Sharing"]["Sales/Marketing"][key],
      ]);
    });
    rows.push(["null", "null", "null", "null", "null"]);
    rows.push(["Active User", "null", "null", "null", "null"]);
    activeUserKeys.map((key) => {
      rows.push([
        key,
        data["Active User"]["Admin Staff"][key],
        data["Active User"]["ICT Dept"][key],
        data["Active User"]["Admin Manager"][key],
        data["Active User"]["Sales/Marketing"][key],
      ]);
    });
    rows.push(["null", "null", "null", "null", "null"]);
    rows.push(["Access Management", "null", "null", "null", "null"]);
    accessManagementKeys.map((key) => {
      rows.push([
        key,
        data["Access Management"]["Admin Staff"][key],
        data["Access Management"]["ICT Dept"][key],
        data["Access Management"]["Admin Manager"][key],
        data["Access Management"]["Sales/Marketing"][key],
      ]);
    });
    return rows;
  };

  const handleSave = () => {};

  const handleCancel = () => {};

  useEffect(() => {
    getPermissions().then((permissions) => {
      var rows = createTable(permissions);
      setData(rows);
    });
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.header}>User Management - Permission Levels</div>
        <section className={styles.table__container}>
          <table className={styles.table}>
            <thead style={{ backgroundColor: "#CCCCCC" }}>
              <tr className={styles.table__head}>
                <td style={{ fontWeight: 700, color: "#293986" }}>Entity</td>
                <td className={styles.table__cell}>Admin staff</td>
                <td className={styles.table__cell}>Ict Dept</td>
                <td className={styles.table__cell}>Admin Manager</td>
                <td className={styles.table__cell}>Sales/Marketing</td>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr
                    className={styles.table__row}
                    key={index}
                    style={{ backgroundColor: index % 2 ? "white" : "#DDDDDD" }}
                  >
                    <td>{row[0] === "null" ? "" : row[0]}</td>
                    <td className={styles.table__cell}>
                      {row[1] === "null" ? (
                        ""
                      ) : (
                        <div
                          className={styles.circle}
                          style={{
                            backgroundColor: row[1] ? "black" : "white",
                          }}
                        ></div>
                      )}
                    </td>
                    <td className={styles.table__cell}>
                      {row[2] === "null" ? (
                        ""
                      ) : (
                        <div
                          className={styles.circle}
                          style={{
                            backgroundColor: row[2] ? "black" : "white",
                          }}
                        ></div>
                      )}
                    </td>
                    <td className={styles.table__cell}>
                      {row[3] === "null" ? (
                        ""
                      ) : (
                        <div
                          className={styles.circle}
                          style={{
                            backgroundColor: row[3] ? "black" : "white",
                          }}
                        ></div>
                      )}
                    </td>
                    <td className={styles.table__cell}>
                      {row[4] === "null" ? (
                        ""
                      ) : (
                        <div
                          className={styles.circle}
                          style={{
                            backgroundColor: row[4] ? "black" : "white",
                          }}
                        ></div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <div className={styles.action__buttons}>
          <button className={styles.action__button} onClick={handleSave}>
            save
          </button>
          <button className={styles.action__button} onClick={handleCancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
