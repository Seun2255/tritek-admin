import Image from "next/image";
import styles from "../styles/verify-login.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function VerifyLogin() {
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <h3 className={styles.title}>
          We&#39;ve sent a login verification code to your registered email
          address
        </h3>
        <label className={styles.verification__box__label}>
          Enter your verification code
        </label>
        <input className={styles.input} type="text" placeholder="_ _ _ _ _ _" />
        <button className={styles.submit__button}>continue</button>
      </div>
    </div>
  );
}
