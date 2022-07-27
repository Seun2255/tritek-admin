import Image from "next/image";
import styles from "../../styles/components/User Management/userGroups.module.css";
import search from "../../assets/icons/search.svg";
import arrow from "../../assets/icons/arrow-circle.svg";
import add from "../../assets/icons/add-new.svg";
import greenAdd from "../../assets/icons/add-new-green.svg";
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
  const groups = [
    "Admin Manager",
    "Admin Staff",
    "ICT Dept",
    "Sales/Marketing",
  ];
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);
  const [succes, setSucces] = useState(false);

  //Remove User
  // const removeUser = (index, group) => {
  //   if (group) {
  //     var temp = { ...userGroups };
  //     temp[group].splice(index, 1);
  //     setUserGroups(temp);
  //   } else {
  //     var tempSelected = [...selected];
  //     tempSelected.splice(index, 1);
  //     setSelected(tempSelected);
  //   }
  // };

  //Checks for wheter an item has been clicked
  const check = (user) => {
    var state = false;
    selected.map((item) => {
      if (user["Emails"] === item["Emails"]) {
        state = true;
      }
    });
    return state;
  };

  const checkSelected = (user) => {
    var state = false;
    selected2.map((item) => {
      if (user["Emails"] === item["Emails"]) {
        state = true;
      }
    });
    return state;
  };

  //Arrrow functions
  const addToGroups = () => {
    var temp = { ...userGroups };
    temp[selectedGroup] = [...temp[selectedGroup], ...selected2];
    setUserGroups(temp);
    var temp2 = usersSelected;
    var check = 0;
    var tempArray = [];
    while (check < usersSelected.length) {
      selected2.map((item) => {
        if (
          temp2[check]["First Name"] === item["First Name"] &&
          temp2[check]["Emails"] === item["Emails"]
        ) {
          tempArray.push(check);
        }
      });
      check++;
    }
    for (var i = tempArray.length - 1; i >= 0; i--) {
      temp2.splice(tempArray[i], 1);
    }
    setSelected2([]);
    setUsersSelected(temp2);
  };

  const addToSelected = () => {
    var keys = Object.keys(userGroups);
    var temp = { ...userGroups };
    keys.map((group) => {
      var check = 0;
      var tempArray = [];
      while (check < temp[group].length) {
        selected.map((item) => {
          if (
            temp[group][check]["First Name"] === item["First Name"] &&
            temp[group][check]["Emails"] === item["Emails"]
          ) {
            tempArray.push(check);
          }
        });
        check++;
      }
      for (var i = tempArray.length - 1; i >= 0; i--) {
        temp[group].splice(tempArray[i], 1);
      }
    });
    var selectedUsers = [...usersSelected, ...selected];
    setUserGroups(temp);
    setUsersSelected(selectedUsers);
    setSelected([]);
  };

  //Item click functions
  const handleAvailableClick = (user) => {
    if (!check(user)) {
      var temp = [...selected];
      temp.push(user);
      setSelected(temp);
    } else {
      var temp = [...selected];
      temp.map((item, index) => {
        if (
          user["First Name"] === item["First Name"] &&
          user["Emails"] === item["Emails"]
        ) {
          temp.splice(index, 1);
          setSelected(temp);
        }
      });
    }
  };

  const handleSelectedClick = (user) => {
    if (!checkSelected(user)) {
      var temp = [...selected2];
      temp.push(user);
      setSelected2(temp);
    } else {
      var temp = [...selected2];
      temp.map((item, index) => {
        if (
          user["First Name"] === item["First Name"] &&
          user["Emails"] === item["Emails"]
        ) {
          temp.splice(index, 1);
          setSelected(temp);
        }
      });
    }
  };

  //Group selection
  const handleGroupClick = (group) => {
    if (group === selectedGroup) {
      setSelectedGroup("");
    } else {
      setSelectedGroup(group);
    }
  };

  //Action button functions
  const handleCancel = () => {};

  const handleSave = () => {
    var keys = Object.keys(userGroups);
    var temp = { ...userGroups };
    keys.map((group) => {
      temp[group].map((user) => {
        user["Roles"] = group;
        return user;
      });
    });
    addRoles(temp).then(() => {
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 2000);
    });
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
      {succes ? (
        <div className={styles.centered}>
          <h1 className={styles.centered__text}>Roles Assigned</h1>
        </div>
      ) : (
        <>
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
                                color: group === selectedGroup ? "green" : null,
                              }}
                            >
                              <div
                                className={styles.add__icon}
                                onClick={() => handleGroupClick(group)}
                              >
                                <Image
                                  alt="plus icon"
                                  layout="fill"
                                  src={group === selectedGroup ? greenAdd : add}
                                />
                              </div>
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
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
                                    }}
                                    style={{
                                      backgroundColor: check(user)
                                        ? "rgb(200, 239, 200)"
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
                    <div
                      className={styles.arrow}
                      style={{ marginBottom: "5px" }}
                      onClick={addToGroups}
                    >
                      <Image alt="arrow icon" layout="fill" src={arrow} />
                    </div>
                    <div
                      className={styles.arrow}
                      style={{ transform: "rotate(180deg)" }}
                      onClick={addToSelected}
                    >
                      <Image alt="arrow icon" layout="fill" src={arrow} />
                    </div>
                  </div>
                  <div className={styles.box}>
                    <label className={styles.box__label}>Selected</label>
                    <div className={styles.box__container}>
                      {usersSelected.map((user, index) => {
                        return (
                          <div
                            className={styles.user}
                            key={index}
                            onClick={() => {
                              handleSelectedClick(user);
                            }}
                            style={{
                              backgroundColor: checkSelected(user)
                                ? "rgb(200, 239, 200)"
                                : null,
                            }}
                          >
                            {user["First Name"]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.action__buttons}>
                  <button
                    className={styles.action__button}
                    onClick={handleCancel}
                  >
                    cancel
                  </button>
                  <button
                    className={styles.action__button}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </main>
            <div className={styles.bottom__bar}></div>
          </div>
        </>
      )}
    </div>
  );
}
