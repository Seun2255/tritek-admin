import Image from "next/image";
import styles from "../../styles/components/User Management/users.module.css";
import clip from "../../assets/icons/clip.svg";
import { useState } from "react";
import { useEffect } from "react";
import UserProfileForm from "./user-profile-form";
import axios from "axios";
import download from "downloadjs";
import getFileName from "../../utils/getFileName";

export default function Users(props) {
  const { data } = props;
  const [editForm, setEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
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
          Attachment: "",
        });
      }
    }
    setFillUpArray(array);
  };

  function downloadFile(file) {
    axios({
      url: file,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const content = response.headers["content-type"];
      download(response.data, getFileName(file), content);
    });
  }

  useEffect(() => {
    fillUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.outer}>
      {editForm ? (
        <UserProfileForm
          mode="edit"
          data={selectedUser}
          setEditForm={setEditForm}
        />
      ) : (
        <div className={styles.container}>
          <section className={styles.table__container}>
            <table className={styles.table}>
              <thead style={{ backgroundColor: "#CCCCCC" }}>
                <tr className={styles.table__head}>
                  <td>Name</td>
                  <td className={styles.table__cell}>Role</td>
                  <td className={styles.table__cell}>Email</td>
                  <td className={styles.table__cell}>Phone Number</td>
                  <td className={styles.table__cell}>Country</td>
                  <td className={styles.table__cell}>Attachment</td>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  return (
                    <tr
                      className={styles.table__row}
                      key={index}
                      style={{
                        backgroundColor: index % 2 ? "white" : "#DDDDDD",
                      }}
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
                      <td className={styles.table__cell}>{row["Country"]}</td>
                      <td
                        className={styles.table__cell}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(row["Attachment"]);
                        }}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        {row["Attachment"] ? (
                          <div
                            style={{
                              width: "30px",
                              height: "20px",
                              position: "relative",
                              zIndex: 10,
                              display: "block",
                              margin: "0 auto",
                            }}
                          >
                            <Image src={clip} alt="clip" layout="fill" />
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
                {fillUPArray.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 ? "#DDDDDD" : "white",
                      }}
                    >
                      <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                      <td className={styles.table__cell}>{row["Roles"]}</td>
                      <td className={styles.table__cell}>{row["Emails"]}</td>
                      <td className={styles.table__cell}>
                        {row["Phone number"]}
                      </td>
                      <td className={styles.table__cell}>{row["Country"]}</td>
                      <td className={styles.table__cell}></td>
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
      )}
    </div>
  );
}
