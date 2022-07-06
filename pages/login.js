import Image from "next/image";
import Link from "next/link";
import styles from "../styles/login.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function Login() {
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.email__icon}>
          <Image alt="logo" layout="fill" src={email} />
        </div>
        <div className={styles.login__box}>
          <input className={styles.input} type="text" placeholder="Username" />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <Link href={"/forgot-password"}>
            <a className={styles.forgot__password}>Forgot Password</a>
          </Link>
          <div className={styles.submit__box}>
            <div className={styles.remember}>
              <div className={styles.tick__box}></div>
              <span className={styles.remember__text}>Remember me</span>
            </div>
            <button className={styles.login__button}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
