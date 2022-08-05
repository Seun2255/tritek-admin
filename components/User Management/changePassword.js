import Image from "next/image";
import styles from "../../styles/components/User Management/changeEmail.module.css";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../pages/api/API";
import { Context } from "../../context";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export default function ChangePassword(props) {
  const { state } = useContext(Context);
  const [mode, setMode] = useState("change");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSave = () => {
    if (newPassword === newPassword2) {
      signInWithEmailAndPassword(auth, state.user.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          updatePassword(user, newPassword).then(() => {
            console.log("Password Changed");
            setMode("succes");
            setTimeout(() => {
              setMode("change");
            }, 2000);
          });
        })
        .catch((error) => {
          console.log("Failed");
          setMode("fail");
          setTimeout(() => {
            setMode("change");
          }, 2000);
        });
    } else {
      alert("New Password doesn't match");
    }
  };

  const handleCancel = () => {};

  return (
    <div className={styles.outer}>
      {mode === "succes" && (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: "green" }}>
            Password Changed
          </h1>
        </div>
      )}
      {mode === "fail" && (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: "red" }}>
            Invalid details Entered
          </h1>
        </div>
      )}
      {mode === "change" && (
        <div className={styles.container}>
          <div className={styles.top__bar}>
            User Management - Change password
          </div>
          <main className={styles.main}>
            <div className={styles.form}>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Current Password</label>
                <input
                  className={styles.input__field}
                  type="Password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>New Password</label>
                <input
                  className={styles.input__field}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>
                  Confirm New Password
                </label>
                <input
                  className={styles.input__field}
                  type="password"
                  onChange={(e) => setNewPassword2(e.target.value)}
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
