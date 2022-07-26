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
  });
  const [storedUsers, setStoredUsers] = useState({
    "Admin Manager": 0,
    "Admin Staff": 0,
    "ICT Dept": 0,
    "Sales/Marketing": 0,
  });

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectUser, setSelectUser] = useState(false);
  const groups = [
    "Admin Manager",
    "Admin Staff",
    "ICT Dept",
    "Sales/Marketing",
  ];
  const [selected, setSelected] = useState([]);
  const [usersSelected, setUsersCollected] = useState([]);

  const removeUser = (index, group) => {
    if (group) {
      var temp = { ...userGroups };
      temp[group].splice(index, 1);
      setUserGroups(temp);
    } else {
      var tempSelected = [...selected];
      tempSelected.splice(index, 1);
      setSelected(tempSelected);
    }
  };

  // const addToGroup = (user, index, group) => {
  //   var temp = { ...userGroups };
  //   if (group) {
  //     removeUser(index, group);
  //     temp.Unassigned.unshift(user);
  //   } else {
  //     removeUser(index);
  //     temp[selectedGroup].push(user);
  //   }
  //   setUserGroups(temp);
  //   console.log(temp);
  // };

  const addToSelected = (user, index, group) => {
    var temp = [...selected];
    removeUser(index, group);
    temp.unshift(user);
    setSelected(temp);
    console.log(temp);
  };

  const addToGroup = (user, index) => {
    var temp = { ...userGroups };
    removeUser(index);
    temp[selectedGroup].push(user);
  };

  // const handleAvailableClick = (user, index, group) => {
  //   if (index > storedUsers[group] - 1) {
  //     addToGroup(user, index, group);
  //   }
  // };

  // const handleSelectedClick = (user, index) => {
  //   addToGroup(user, index);
  // };

  const handleAvailableClick = (user) => {
    if (true) {
      var temp = [...selected];
      temp.push(user);
      setSelected(temp);
    }
  };

  const handleSelectedClick = (user, index) => {};

  const handleGroupClick = (group) => {
    if (group === selectedGroup) {
      setSelectedGroup("");
    } else {
      setSelectedGroup(group);
    }
  };

  const handleCancel = () => {};

  const check = (user) => {
    selected.map((item) => {
      if (user["Emails"] === item["Emails"]) {
        return true;
        console.log("True");
      }
    });
    return false;
    console.log("False");
  };

  const handleSave = () => {
    var keys = Object.keys(userGroups);
    var temp = { ...userGroups };
    keys.map((group) => {
      temp[group].map((user) => {
        user["Roles"] = group;
        return user;
      });
    });
    addRoles(temp);
  };

  useEffect(() => {
    getRoles().then((roles) => {
      setUserGroups(roles);
      setStoredUsers({
        "Admin Manager": roles["Admin Manager"].length,
        "Admin Staff": roles["Admin Staff"].length,
        "ICT Dept": roles["ICT Dept"].length,
        "Sales/Marketing": roles["Sales/Marketing"].length,
      });
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
                        <div
                          className={styles.user__group}
                          style={{
                            backgroundColor:
                              group === selectedGroup
                                ? "rgb(144, 187, 144)"
                                : null,
                          }}
                        >
                          <div
                            className={styles.add__icon}
                            onClick={() => handleGroupClick(group)}
                          >
                            <Image alt="plus icon" layout="fill" src={add} />
                          </div>
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {group}
                          </span>
                        </div>
                        <div>
                          {userGroups[group].map((user, index) => {
                            return (
                              <div
                                className={styles.user}
                                onClick={() => {
                                  handleAvailableClick(user);
                                  console.log(selected);
                                }}
                                style={{
                                  backgroundColor: check(user)
                                    ? "rgb(144, 187, 144)"
                                    : null,
                                }}
                                key={index}
                              >
                                {user["First Name"]}
                              </div>
                            );
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
                <div
                  className={styles.arrow}
                  style={{ transform: "rotate(180deg)" }}
                >
                  <Image alt="arrow icon" layout="fill" src={arrow} />
                </div>
              </div>
              <div className={styles.box}>
                <label className={styles.box__label}>Selected</label>
                <div className={styles.box__container}>
                  {selected.map((user, index) => {
                    return (
                      <div
                        className={styles.user}
                        key={index}
                        onClick={() => handleSelectedClick(user, index)}
                      >
                        {user["First Name"]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.action__buttons}>
              <button className={styles.action__button} onClick={handleCancel}>
                cancel
              </button>
              <button className={styles.action__button} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </main>
        <div className={styles.bottom__bar}></div>
      </div>
    </div>
  );
}
