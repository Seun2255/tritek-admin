import Image from "next/image";
import styles from "../styles/components/mySettings.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function MySettings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Settings</h1>
    </div>
  );
}
