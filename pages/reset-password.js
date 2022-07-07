import Image from "next/image";
import styles from "../styles/reset-password.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function ResetPassword() {
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.password}>
          <div className={styles.password__input}>
            <label className={styles.input__label}>New password</label>
            <input type="password" className={styles.input} />
          </div>
          <div className={styles.password__tips}>
            <div className={styles.tip__text}>Passord Strength</div>
            <div className={styles.tip__text}>- At least 7 characters</div>
            <div className={styles.tip__text}>
              - At least one uppercase and one lower case letter
            </div>
            <div className={styles.tip__text}>- At least one number</div>
            <div className={styles.tip__text}>
              - At least one special character (+, #, ? ...... )
            </div>
          </div>
        </div>
        <div className={styles.confirm__password}>
          <label className={styles.input__label}>Confirm new password</label>
          <input type="password" className={styles.input} />
        </div>
        <button className={styles.submit__button}>Reset password</button>
      </div>
    </div>
  );
}
