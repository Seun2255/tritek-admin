import Image from "next/image";
import Link from "next/link";
import styles from "../styles/login.module.css";
import logo from "../assets/logo.png";
import emailIcon from "../assets/icons/email.svg";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn, signUserOut, auth } from "./api/API";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // const result = await signIn(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const otp = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("otp", otp);
        axios
          .post("http://127.0.0.1:8000/api/send-mail", {
            email: email,
            otp: otp,
          })
          .then(function (response) {
            console.log(response);
            console.log("Succes");
          })
          .catch(function (error) {
            console.log("Failed");
            console.log(error);
          });
        signOut(auth);
        router.push("/verify-login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Not signed in", errorMessage);
        setInvalid(true);
        console.log("User not signed in");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        {invalid && (
          <div className={styles.invalid}>Invalid Username or Password</div>
        )}
        <div className={styles.input__container}>
          <div className={styles.email__icon}>
            <Image alt="logo" layout="fill" src={emailIcon} />
          </div>
          <div className={styles.login__box}>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setEmail(e.target.value);
                setInvalid(false);
              }}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setInvalid(false);
              }}
            />
            <Link href={"/forgot-password"}>
              <a className={styles.forgot__password}>Forgot Password</a>
            </Link>
            <div className={styles.submit__box}>
              <div className={styles.remember}>
                <div className={styles.tick__box}></div>
                <span className={styles.remember__text}>Remember me</span>
              </div>
              <div className={styles.login__button} onClick={handleSubmit}>
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
