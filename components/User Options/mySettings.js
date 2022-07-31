import Image from "next/image";
import styles from "../../styles/components/User Options/mySettings.module.css";
import { useState } from "react";

export default function MySettings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Settings</h1>
    </div>
  );
}
