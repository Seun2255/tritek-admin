import Image from "next/image";
import styles from "../styles/reset-password.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";
import { resetPasswordConfirmation } from "./api/API";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();
  const code = router.query.oobCode;
  console.log(router.query);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      resetPasswordConfirmation(password, code).then(() => {
        router.push("/reset-confirmation");
      });
    } else {
      setPasswordMismatch(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.password}>
          <div className={styles.password__input}>
            <label className={styles.input__label}>New password</label>
            <input
              type="password"
              className={styles.input}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMismatch(false);
              }}
            />
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
        {passwordMismatch && (
          <div className={styles.invalid__password}>
            Passwords don&#39;t match
          </div>
        )}
        <div className={styles.confirm__password}>
          <label className={styles.input__label}>Confirm new password</label>
          <input
            type="password"
            className={styles.input}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMismatch(false);
            }}
          />
        </div>
        <button className={styles.submit__button} onClick={handleSubmit}>
          Reset password
        </button>
      </div>
    </div>
  );
}
