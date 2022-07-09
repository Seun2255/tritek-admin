import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";
import styles from "../styles/Home.module.css";
import arrow from "../assets/icons/arrow.svg";
import search from "../assets/icons/search.svg";
import microphone from "../assets/icons/microphone.svg";
import profile from "../assets/icons/profile.svg";
import Dashboard from "../components/dashboard";
import ContactManagement from "../components/contactManagement";
import KnowledgeBase from "../components/knowledgeBase";
import Queries from "../components/queries";
import Reports from "../components/reports";
import UserManagement from "../components/userManagement";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("Dashboard");
  const router = useRouter();
  const options = ["My Settings", "Options", "Add Image", "Change Password"];
  const views = [
    "Dashboard",
    "Queries",
    "Contact Management",
    "Reports",
    "User Management",
    "Knowledge Base",
  ];

  useEffect(() => {
    const now = new Date();
    const session = localStorage.getItem("session");

    if (now.getTime() > session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image alt="logo" layout="fill" src={logo} />
      </div>
      <div className={styles.user__and__search}>
        <div className={styles.search__box}>
          <div className={styles.search__icon}>
            <Image alt="search icon" layout="fill" src={search} />
          </div>
          <input type="text" className={styles.search__input} />
          <div className={styles.search__icon}>
            <Image alt="Microphone icon" layout="fill" src={microphone} />
          </div>
        </div>
        <div className={styles.user__box}>
          <div className={styles.profile__pic}>
            <Image alt="profile pic" layout="fill" src={profile} />
          </div>
          <div className={styles.home__buttons}>
            <button
              className={styles.menu__button}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>Admin User</span>
              <div className={styles.dropdown__arrow}>
                <Image
                  alt="arrow"
                  layout="fill"
                  src={arrow}
                  style={{
                    transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </button>
            {menuOpen && (
              <div className={styles.menu}>
                {options.map((option, id) => {
                  return (
                    <div key={id} className={styles.question}>
                      {option}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.options}>
          {views.map((view, id) => {
            return (
              <div
                key={id}
                className={styles.option__box}
                style={{
                  backgroundColor: view === currentView ? "white" : "#cccccc",
                  width: view === currentView ? "calc(100% + 1px)" : "100%",
                  left: view === currentView ? "1px" : "0px",
                }}
                onClick={() => setCurrentView(view)}
              >
                {view}
              </div>
            );
          })}
        </div>
        <div className={styles.view}>
          {currentView === "Dashboard" && <Dashboard />}
          {currentView === "Contact Management" && <ContactManagement />}
          {currentView === "Knowledge Base" && <KnowledgeBase />}
          {currentView === "Queries" && <Queries />}
          {currentView === "Reports" && <Reports />}
          {currentView === "User Management" && <UserManagement />}
        </div>
      </div>
    </div>
  );
}
