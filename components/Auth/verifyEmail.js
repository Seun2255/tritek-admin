import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/reset-confirmation.module.css";
import logo from "../../assets/logo.png";
import { confirmSignUp } from "../../pages/api/API";
import { useEffect } from "react";

export default function VerifyEmail(props) {
  const { code } = props;

  useEffect(() => {
    confirmSignUp(code).then(() => {
      console.log("Email Verified");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.title}>Email Verified</div>
        <div className={styles.details}>
          Welcome to Tritek, you can change you password in the user Management
          tab after logging in. Please click{" "}
          <Link href={"login"}>
            <span className={styles.login__redirect}>here</span>
          </Link>{" "}
          to login
        </div>
      </div>
    </div>
  );
}
