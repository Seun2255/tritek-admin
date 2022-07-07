import Image from "next/image";
import styles from "../styles/reset-confirmation.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function ResetConfirmation() {
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.title}>Reset password confirmation</div>
        <div className={styles.details}>
          Your password has been changed . Please click{" "}
          <a className={styles.login__redirect}>here</a> to login
        </div>
      </div>
    </div>
  );
}
