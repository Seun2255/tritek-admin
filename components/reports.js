import Image from "next/image";
import styles from "../styles/components/reports.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function Reports() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reports</h1>
    </div>
  );
}
