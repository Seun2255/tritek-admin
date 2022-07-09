import Image from "next/image";
import styles from "../styles/components/userManagement.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function UserManagement() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
    </div>
  );
}
