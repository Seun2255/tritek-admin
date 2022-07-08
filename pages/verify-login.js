import Image from "next/image";
import styles from "../styles/verify-login.module.css";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signUserOut } from "./api/API";

export default function VerifyLogin() {
  const [remember, setRemember] = useState(false);
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
    setOtp(localStorage.getItem("otp"));
  }, []);

  const handleSubmit = () => {
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
