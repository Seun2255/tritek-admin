import Image from "next/image";
import styles from "../styles/components/knowledgeBase.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";

export default function KnowledgeBase() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Knowledge Base</h1>
    </div>
  );
}
