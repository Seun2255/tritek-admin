import Image from "next/image";
import { useState } from "react";
import styles from "../styles/components/statement-form.module.css";

export default function StatementForm(props) {
  const { changeForm } = props;
  const [ticked, setTicked] = useState(false);
  const [query, setQuery] = useState(false);

  const handleAccept = () => {
    if (ticked) {
      changeForm("profile");
    }
  };

  const handleProfileSave = () => {
    setProfile(false);
    setQuery(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GDPR STATEMENT (Read to candidate)</h2>
      <div className={styles.terms}>cat</div>
      <div className={styles.accept__box}>
        <div
          className={styles.tick__box}
          onClick={() => setTicked(!ticked)}
        ></div>
        <button className={styles.accept__button} onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
