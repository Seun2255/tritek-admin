import Image from "next/image";
import styles from "../styles/verify-login.module.css";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signUserOut } from "./api/API";

export default function VerifyLogin() {
  const [remember, setRemember] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const otp = localStorage.getItem("otp");
    if (input === otp) {
      signIn(email, password).then(() => {
        router.push("/");
      });
    } else {
      setInput("invalid OTP");
    }
  };

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
        <input
          className={styles.input}
          type="text"
          placeholder="_ _ _ _ _ _"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <button className={styles.submit__button} onClick={handleSubmit}>
          continue
        </button>
      </div>
    </div>
  );
}
