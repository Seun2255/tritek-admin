import Image from "next/image";
import Link from "next/link";
import styles from "../styles/reset-confirmation.module.css";
import logo from "../assets/logo.png";

export default function ResetConfirmation() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.inner__div}>
        <div className={styles.title}>Reset password confirmation</div>
        <div className={styles.details}>
          Your password has been changed. Please click{" "}
          <Link href={"login"}>
            <span className={styles.login__redirect}>here</span>
          </Link>{" "}
          to login
        </div>
      </div>
    </div>
  );
}
