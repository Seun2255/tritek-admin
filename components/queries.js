import Image from "next/image";
import styles from "../styles/components/queries.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function Queries() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Queries</h1>
    </div>
  );
}
