import Image from "next/image";
import styles from "../../styles/components/User Management/userGroups.module.css";
import search from "../../assets/icons/search.svg";
import arrow from "../../assets/icons/arrow-circle.svg";
import add from "../../assets/icons/arrow-circle.svg";
import { useState, useEffect } from "react";
import { getRoles, addRoles } from "../../pages/api/API";

export default function UserGroups(props) {
  const { data } = props;
  const [userGroups, setUserGroups] = useState({
    "Admin Manager": [],
    "Admin Staff": [],
    "ICT Dept": [],
    "Sales/Marketing": [],
    Unassigned: [],
  });

  const [available, setAvailable] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const groups = [
    "Admin Manager",
    "Admin Staff",
    "ICT Dept",
    "Sales/Marketing",
  ];

  useEffect(() => {
    getRoles().then((roles) => {
      setUserGroups(roles);
      setAvailable(roles["Unassigned"]);
    });
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.top__bar}>
          User Management - Settings - User Groups
        </div>
        <main className={styles.main}>
          <h3 className={styles.title}>Add Users to a Group</h3>
          <div className={styles.user__groups}>
            <div className={styles.search__box}>
              <div className={styles.search__icon}>
                <Image alt="search icon" layout="fill" src={search} />
              </div>
              <input
                type="text"
                className={styles.search__input}
                placeholder="search"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div className={styles.boxes}>
              <div className={styles.box}>
                <label className={styles.box__label}>Available</label>
                <div className={styles.box__container}>
                  {groups.map((group, index) => {
                    return (
                      <div
                        className={styles.user__group__container}
                        key={index}
                      >
                        <div className={styles.user__group}>
                          <div className={styles.add__icon}>
                            <Image alt="plus icon" layout="fill" src={add} />
                          </div>
                          {group}
                        </div>
                        <div>
                          {userGroups[group].map((user) => {
                            <div className={styles.user}>
                              {user["First Name"]}
                            </div>;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.arrow__container}>
                <div className={styles.arrow} style={{ marginBottom: "5px" }}>
                  <Image alt="arrow icon" layout="fill" src={arrow} />
                </div>
                <div className={styles.arrow}>
                  <Image alt="arrow icon" layout="fill" src={arrow} />
                </div>
              </div>
              <div className={styles.box}>
                <label className={styles.box__label}>Selected</label>
                <div className={styles.box__container}>
                  {userGroups.Unassigned.map((user, index) => {
                    return (
                      <div className={styles.user} key={index}>
                        {user["First Name"]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className={styles.bottom__bar}></div>
      </div>
    </div>
  );
}
