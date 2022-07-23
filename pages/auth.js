import Image from "next/image";
import styles from "../styles/reset-password.module.css";
import { useRouter } from "next/router";
import ResetPassword from "../components/Auth/resetPassword";
import VerifyEmail from "../components/Auth/verifyEmail";

export default function Auth() {
  const router = useRouter();
  const code = router.query.oobCode;
  const mode = router.query.mode;

  return (
    <div className={styles.container}>
      {mode === "resetPassword" && <ResetPassword code={code} />}
      {mode === "verifyEmail" && <VerifyEmail code={code} />}
    </div>
  );
}
