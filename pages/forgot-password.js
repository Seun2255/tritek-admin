import Image from "next/image";
import styles from "../styles/forgot-password.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";
import { resetPassword } from "./api/API";

export default function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = () => {
    resetPassword(emailInput)
      .then(() => {
        console.log("SUCCES");
      })
      .catch(() => {
        console.log("It didn't work");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <h1 className={styles.title}>Forgotten your password</h1>
        <p className={styles.details}>
          Please enter your account email address. We will send an email
          containing instructions to reset your password.
        </p>
        <div className={styles.email__div}>
          <label className={styles.email__label}>Email Address*</label>
          <div className={styles.email__input}>
            <div className={styles.email__icon}>
              <Image alt="logo" layout="fill" src={email} />
            </div>
            <div className={styles.login__box}>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
            </div>
          </div>
          <button className={styles.submit__button} onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
