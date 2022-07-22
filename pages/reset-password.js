import Image from "next/image";
import styles from "../styles/reset-password.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import correct from "../assets/icons/accept.png";
import invalid from "../assets/icons/multiply.png";
import { useState } from "react";
import { resetPasswordConfirmation } from "./api/API";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordInavalid, setPasswordInavalid] = useState(false);
  const [statusIcon, setStatusIcon] = useState(false);
  const [statusIcon2, setStatusIcon2] = useState(false);
  const [timeout, changeTimeout] = useState();
  const router = useRouter();
  const code = router.query.oobCode;

  const handleSubmit = () => {
    if (password === confirmPassword && !passwordInavalid) {
      resetPasswordConfirmation(password, code.toString())
        .then(() => {
          router.push("/reset-confirmation");
        })
        .catch(() => {
          console.log("it didn't work");
        });
    } else {
      setPasswordMismatch(true);
    }
  };

  const checkMatch = () => {
    setStatusIcon2(true);
    if (password === confirmPassword) {
      setPasswordMismatch(false);
    } else {
      setPasswordMismatch(true);
    }
  };

  const validatePassword = () => {
    var timeout;
    const containsSpecialCharacter = /[^a-zA-Z0-9]/;
    const containsUpperCaseCharacter = /[A-Z]/;
    const containsLowerCaseCharacter = /[a-z]/;

    if (
      password.length >= 7 &&
      containsLowerCaseCharacter.test(password) &&
      containsSpecialCharacter.test(password) &&
      containsUpperCaseCharacter.test(password)
    ) {
      setPasswordInavalid(false);
      clearTimeout(timeout);
    } else if (password.length === 1) {
      changeTimeout(
        setTimeout(() => {
          setPasswordInavalid(true);
          setStatusIcon(true);
        }, 1500)
      );
    } else if (password.length >= 7) {
      setPasswordInavalid(true);
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
                validatePassword();
              }}
              onFocus={() => {
                setStatusIcon(false);
                setStatusIcon2(false);
              }}
            />
            {statusIcon && (
              <div className={styles.password__state}>
                <Image
                  alt="tick or cross"
                  layout="fill"
                  src={passwordInavalid ? invalid : correct}
                />
              </div>
            )}
          </div>
          {passwordInavalid && (
            <div className={styles.password__tips}>
              <div className={styles.tip__text} style={{ color: "black" }}>
                The entry does not meet criteria, At least:
              </div>
              <div className={styles.tip__text}>7 characters</div>
              <div className={styles.tip__text}>one uppercase letter</div>
              <div className={styles.tip__text}>one lower case letter</div>
              <div className={styles.tip__text}>one number</div>
              <div className={styles.tip__text}>
                one special character (+, #, ? ...... )
              </div>
            </div>
          )}
        </div>
        <div className={styles.confirm__password}>
          <label className={styles.input__label}>Confirm new password</label>
          <input
            type="password"
            className={styles.input}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              checkMatch();
            }}
            onFocus={() => {
              setStatusIcon2(false);
            }}
          />
          {statusIcon2 && (
            <div className={styles.mismatch__container}>
              <div className={styles.mismatch__state}>
                <Image
                  alt="tick or cross"
                  layout="fill"
                  src={passwordMismatch ? invalid : correct}
                />
              </div>
              {passwordMismatch && (
                <span className={styles.mismatch__text}>
                  Password doesn&#39;t match
                </span>
              )}
            </div>
          )}
        </div>
        <button className={styles.submit__button} onClick={handleSubmit}>
          Reset password
        </button>
      </div>
    </div>
  );
}
