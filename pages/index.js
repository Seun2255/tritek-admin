import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import logo from "../assets/tritek-logo.png";
import styles from "../styles/Home.module.css";
import arrow from "../assets/icons/arrow-black.svg";
import search from "../assets/icons/search.svg";
import microphone from "../assets/icons/microphone.svg";
import profile from "../assets/icons/profile.svg";
import Dashboard from "../components/dashboard";
import ContactManagement from "../components/contactManagement";
import Queries from "../components/Queries/index";
import Reports from "../components/Reports/index";
import UserManagement from "../components/User Management/index";
import KnowledgeBase from "../components/Knowledge Base/index";
import UserOptions from "../components/User Options/index";
import {
  auth,
  db,
  addEmployee,
  addQuery,
  getData,
  getMails,
  addRoles,
  confirmStatus,
} from "./api/API";
import { signOut } from "firebase/auth";
import querySorter from "../utils/querySorter";
import { contactSearch, querySearch } from "../utils/search";
import NewQuery from "../components/Create Query/index";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [people, setPeople] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [option, setOption] = useState("");
  const [queryStatus, setQueryStatus] = useState("new");
  const [sideDropdown, setSideDropdown] = useState(false);
  const sideDropOptions = {
    Queries: ["New", "In Progress", "Resolved"],
    "Contact Management": ["New Query"],
    "User Management": ["settings"],
    "Knowledge Base": ["Videos", "Templates", "Training Manuals"],
  };
  const [allQueries, setAllQueries] = useState([]);

  const [dropOptions, setDropOptions] = useState(sideDropOptions["Queries"]);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [form, setForm] = useState("");
  const [formMode, setFormMode] = useState("new");
  const [currentQueries, setCurrentQueries] = useState([]);
  const [userOptions, setUserOptions] = useState(false);

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
    state.user.photoURL ? "Change Image" : "Add Image",
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
    if (view === "Dashboard" || view === "Reports") {
      setCurrentView(view);
      setOption("");
      setSideDropdown(false);
      setSettingsDropdown(false);
      setUserOptions(false);
      setForm("");
    } else if (view === "Contact Management") {
      setUserOptions(false);
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

  const handleOptionClick = () => {};

  const handleQueryOptionClick = (option) => {
    setUserOptions(false);
    if (option === "settings") {
      setSettingsDropdown(!settingsDropdown);
    } else if (option === "New Query") {
      setCurrentView(selectedDropdown);
      setSideDropdown(false);
      setForm("new query");
    } else {
      setCurrentView(selectedDropdown);
      if (option === "In Progress") {
        setQueryStatus("in Progress");
        setCurrentQueries(queries["in Progress"]);
        setForm("");
      } else {
        setQueryStatus(option);
        setCurrentQueries(queries[option]);
        setForm("");
      }
      setSideDropdown(false);
    }
  };

  const viewQuery = (option) => {
    setCurrentView("Queries");
    setQueryStatus(option);
    setUserOptions(false);
  };

  const handleSettingClick = (option) => {
    setCurrentView("User Management");
    setUserOptions(false);
    setOption("");
    setSettingsDropdown(false);
    setSideDropdown(false);
    setForm("");
    if (option === "add a user") {
      setForm("profile");
    } else if (option === "edit user account") {
      setForm("edit");
    } else if (option === "User Groups") {
      setForm("user groups");
    } else if (option === "Change email") {
      setForm("change email");
    } else if (option === "Permission Level") {
      setForm("permissions");
    }
  };

  const handleSearch = (search) => {
    if (currentView === "Queries") {
      if (search.length >= 3) {
        const results = querySearch(queries[queryStatus], search);
        setCurrentQueries(results);
      } else {
        setCurrentQueries(queries[queryStatus]);
      }
    } else {
      if (search.length >= 3) {
        const results = contactSearch(employees, search);
        setPeople(results);
        console.log("in first part");
      } else {
        console.log("in second part");
        console.log(employees);
        setPeople(employees);
      }
    }
  };

  const userOptionClicked = (option) => {
    setOption(option);
    setUserOptions(true);
    setMenuOpen(false);
    setForm("");
  };

  useEffect(() => {
    const now = new Date();
    const session = localStorage.getItem("session");
    if (now.getTime() > session) {
      router.push("/login");
    }
    getData().then((data) => {
      setAllQueries(data.queries);
      const sortedQueries = querySorter(data.queries);
      setQueries(sortedQueries);
      setCurrentQueries(sortedQueries["New"]);
      setEmployees(data.employees);
      setPeople(data.employees);
      setCurrentView("Dashboard");
    });
    const unsubQueries = onSnapshot(doc(db, "data", "queries"), (doc) => {
      var data = doc.data().data;
      const sortedQueries = querySorter(data);
      setQueries(sortedQueries);
      setCurrentQueries(sortedQueries["New"]);
    });
    const unsubEmployees = onSnapshot(doc(db, "data", "employees"), (doc) => {
      var data = doc.data().data;
      setEmployees(data);
      if (search.length >= 3) {
        const results = contactSearch(data, search);
        setPeople(results);
      } else {
        setPeople(data);
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch({
          type: "LOGGED_IN_USER",
          payload: user,
        });
        confirmStatus(user.email);
        // ...
      } else {
        // User is signed out
        // ...
      }
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
            <img
              alt="profile pic"
              src={state.user.photoURL || profile}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className={styles.home__buttons}>
            <button
              className={styles.menu__button}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
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
                          : userOptionClicked(option);
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
      {/* The Main APP */}
      <div
        className={styles.main}
        style={{ width: currentView === "Reports" ? "97%" : "84%" }}
      >
        <div
          className={styles.options}
          style={{ width: currentView === "Reports" ? "13%" : "15%" }}
        >
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
                    backgroundColor:
                      view === currentView ? "#fee8ad" : "#293986",
                    color: view === currentView ? "#293986" : "white",
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
            <Dashboard
              data={queries}
              viewQuery={viewQuery}
              setCurrentQueries={setCurrentQueries}
            />
          )}
          {currentView === "Contact Management" && (
            <ContactManagement data={people} />
          )}
          {currentView === "Queries" && (
            <Queries data={currentQueries} staff={employees} />
          )}
          {currentView === "Reports" && <Reports queries={allQueries} />}
          {currentView === "User Management" && (
            <UserManagement form={form} data={people} employees={employees} />
          )}
          {currentView === "Knowledge Base" && <KnowledgeBase />}
          {userOptions && (
            <UserOptions option={option} setUserOptions={setUserOptions} />
          )}
          {form === "new query" && <NewQuery closeForm={() => setForm("")} />}
        </div>
      </div>
    </div>
  );
}
