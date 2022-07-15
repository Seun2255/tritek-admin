import Image from "next/image";
import styles from "../styles/components/users.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";
import { useEffect } from "react";
import CandidateProfileForm from "./candidate-profile-form";

export default function Users(props) {
  const { data } = props;
  const [editForm, setEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [userId, setUserId] = useState("");
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
          Location: "",
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
        <section className={styles.table__container}>
          <table className={styles.table}>
            <thead style={{ backgroundColor: "#CCCCCC" }}>
              <tr className="table__head">
                <td>Name</td>
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
                    onClick={() => {
                      setSelectedUser(row);
                      setEditForm(true);
                    }}
                  >
                    <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                    <td className={styles.table__cell}>{row["Roles"]}</td>
                    <td className={styles.table__cell}>{row["Emails"]}</td>
                    <td className={styles.table__cell}>
                      {row["Phone number"]}
                    </td>
                    <td className={styles.table__cell}>{row["Location"]}</td>
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
                    <td className={styles.table__cell}>{row["Location"]}</td>
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
        {editForm && (
          <CandidateProfileForm
            mode="edit"
            data={selectedUser}
            setEditForm={setEditForm}
            id={userId}
            users={data}
          />
        )}
      </div>
    </div>
  );
}
