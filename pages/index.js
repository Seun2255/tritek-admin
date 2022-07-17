import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";
import styles from "../styles/Home.module.css";
import arrow from "../assets/icons/arrow-black.svg";
import search from "../assets/icons/search.svg";
import microphone from "../assets/icons/microphone.svg";
import profile from "../assets/icons/profile.svg";
import Dashboard from "../components/dashboard";
import ContactManagement from "../components/contactManagement";
import Users from "../components/users";
import KnowledgeBase from "../components/knowledgeBase";
import Queries from "../components/queries";
import Reports from "../components/reports";
import UserManagement from "../components/userManagement";
import MySettings from "../components/mySettings";
import CandidateProfileForm from "../components/candidate-profile-form";
import { auth, addEmployee, addQuery, getData, getMails } from "./api/API";
import { signOut } from "firebase/auth";
import querySorter from "../utils/querySorter";
import contactSearch from "../utils/contactSearch";
import NewQuery from "../components/newQuery";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [people, setPeople] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [option, setOption] = useState("");
  const [queryStatus, setQueryStatus] = useState("new");
  const [sideDropdown, setSideDropdown] = useState(false);
  const sideDropOptions = {
    Queries: ["New", "in Progress", "Resolved"],
    "Contact Management": ["New Query"],
    "User Management": ["settings"],
  };

  const [dropOptions, setDropOptions] = useState(sideDropOptions["Queries"]);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [form, setForm] = useState("");
  const [formMode, setFormMode] = useState("new");

  const settingsDropdownList = [
    "add a user",
    "edit user account",
    "Change email",
    "User Groups",
    "Permission Level",
  ];

  const router = useRouter();
  const options = [
    "My Settings",
    "Options",
    "Add Image",
    "Change Password",
    "logout",
  ];
  const views = [
    "Dashboard",
    "Queries",
    "Contact Management",
    "Reports",
    "User Management",
    "Knowledge Base",
  ];

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      router.push("/login");
    });
  };

  const handleSidebarClick = (view) => {
    if (
      view === "Dashboard" ||
      view === "Reports" ||
      view === "Knowledge Base"
    ) {
      setCurrentView(view);
      setOption("");
      setSideDropdown(false);
      setSettingsDropdown(false);
    } else if (view === "Contact Management") {
      setCurrentView(view);
      setOption("");
      setSelectedDropdown(view);
      setDropOptions(sideDropOptions[view]);
      selectedDropdown === view && sideDropdown
        ? setSideDropdown(false)
        : setSideDropdown(true);
      setSettingsDropdown(false);
    } else {
      selectedDropdown === view && sideDropdown
        ? setSideDropdown(false)
        : setSideDropdown(true);
      setSelectedDropdown(view);
      setDropOptions(sideDropOptions[view]);
      setSettingsDropdown(false);
    }
  };

  const handleQueryOptionClick = (option) => {
    if (option === "settings") {
      setSettingsDropdown(!settingsDropdown);
    } else if (option === "New Query") {
      setCurrentView(selectedDropdown);
      setQueryStatus(option);
      setSideDropdown(false);
      setForm("new query");
    } else {
      setCurrentView(selectedDropdown);
      setQueryStatus(option);
      setSideDropdown(false);
    }
  };

  const viewQuery = (option) => {
    setCurrentView("Queries");
    setQueryStatus(option);
  };

  const handleSettingClick = (option) => {
    setCurrentView("User Management");
    setOption("");
    if (option === "add a user") {
      setForm("candidate profile form");
      setFormMode("new");
    } else if (option === "edit user account") {
      setForm("users");
      setFormMode("edit");
    }
  };

  const handleSearch = (search) => {
    if (search.length >= 3) {
      const results = contactSearch(employees, search);
      setPeople(results);
    } else {
      setPeople(employees);
    }
  };

  useEffect(() => {
    const now = new Date();
    const session = localStorage.getItem("session");

    if (now.getTime() > session) {
      router.push("/login");
    }
    getData().then((data) => {
      const sortedQueries = querySorter(data.queries);
      setQueries(sortedQueries);
      setEmployees(data.employees);
      setPeople(data.employees);
      setCurrentView("Dashboard");
    });

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
          <input
            type="text"
            className={styles.search__input}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
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
                    <div
                      key={id}
                      className={styles.question}
                      onClick={() => {
                        option === "logout"
                          ? logout()
                          : () => {
                              setOption(option);
                              // setCurrentView("");
                            };
                      }}
                    >
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
                className={styles.option__container}
                style={{
                  backgroundColor: view === currentView ? "white" : "#cccccc",
                  width: view === currentView ? "calc(100% + 2px)" : "100%",
                }}
              >
                {/* Sidebar buttons */}
                <div
                  className={styles.option__box}
                  style={{
                    backgroundColor: view === currentView ? "white" : "#cccccc",
                  }}
                  onClick={() => handleSidebarClick(view)}
                >
                  {view}
                </div>
                {/* For dropdowwn */}
                {selectedDropdown === view && sideDropdown && (
                  <div className={styles.dropdown__menu}>
                    {dropOptions.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.dropdown__item}
                          onClick={() => handleQueryOptionClick(option)}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* For settings secondary dropdown only */}
                {settingsDropdown && selectedDropdown === view && (
                  <div className={styles.settings__dropdown__menu}>
                    {settingsDropdownList.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.settings__dropdown__item}
                          onClick={() => handleSettingClick(option)}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.view}>
          {currentView === "Dashboard" && (
            <Dashboard data={queries} viewQuery={viewQuery} />
          )}
          {currentView === "Contact Management" && (
            <ContactManagement data={people} />
          )}
          {currentView === "Knowledge Base" && <KnowledgeBase />}
          {currentView === "Queries" && <Queries data={queries[queryStatus]} />}
          {currentView === "Reports" && <Reports />}
          {currentView === "User Management" && <UserManagement />}
          {option === "My Settings" && <MySettings />}
          {form === "candidate profile form" && (
            <CandidateProfileForm mode={formMode} />
          )}
          {form === "users" && <Users />}
          {form === "new query" && <NewQuery />}
        </div>
      </div>
    </div>
  );
}
