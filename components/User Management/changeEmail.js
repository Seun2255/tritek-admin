import Image from "next/image";
import styles from "../../styles/components/User Management/changeEmail.module.css";
import { useState, useEffect, useContext } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import { changeEmail } from "../../pages/api/API";
import { Context } from "../../context";

export default function ChangeEmail(props) {
  const { state } = useContext(Context);
  const [succes, setSucces] = useState(false);
  const [succesText, setSuccesText] = useState("Email Changed");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmail2, setNewEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("green");

  const handleSave = () => {
    if (newEmail === newEmail2) {
      changeEmail(currentEmail, password).then((result) => {
        result ? setColor("green") : setColor("red");
        var text = result ? "Email Changed" : "Invalid details Entered";
        console.log(text);
        setSuccesText(text);
        setSucces(true);
        if (!result) {
          setTimeout(() => {
            setSucces(false);
          }, 2000);
        }
      });
    } else {
      alert("New email doesn't match");
    }
  };

  const handleCancel = () => {};

  return (
    <div className={styles.outer}>
      {succes ? (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: color }}>
            {succesText}
          </h1>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.top__bar}>User Management - Change email</div>
          <main className={styles.main}>
            <div className={styles.form}>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Current Email</label>
                <input
                  className={styles.input__field}
                  type="email"
                  onChange={(e) => setCurrentEmail(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>New Email</label>
                <input
                  className={styles.input__field}
                  type="text"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Retype New Email</label>
                <input
                  className={styles.input__field}
                  type="text"
                  onChange={(e) => setNewEmail2(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Password</label>
                <input
                  className={styles.input__field}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderBottom: "2px solid black" }}
                />
              </div>
              <div className={styles.action__buttons}>
                <button className={styles.action__button} onClick={handleSave}>
                  Change
                </button>
                <button
                  className={styles.action__button}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </main>
          <div className={styles.bottom__bar}></div>
        </div>
      )}
    </div>
  );
}
