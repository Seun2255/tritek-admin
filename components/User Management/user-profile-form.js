import Image from "next/image";
import styles from "../../styles/components/User Management/user-profile-form.module.css";
import { useState, useEffect } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import { addEmployee, editEmployee, removeEmployee } from "../../pages/api/API";

export default function UserProfileForm(props) {
  const { mode, data, setEditForm } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("country");
  const options = ["Germany", "America", "Japan", "Nigeria", "China"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [landlinePhone, setLandlinePhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");
  const [comments, setComments] = useState("");
  const [deleted, SetDeleted] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const handleSave = () => {
    const employee = {
      "First Name": firstName,
      "Last Name": lastName,
      "Phone number": mobilePhone,
      "Landline Phone": landlinePhone,
      Emails: email,
      "Street Address 1": streetAddress1,
      "Street Address 2": streetAddress2,
      City: city,
      Zip: zip,
      County: county,
      Country: country,
      Comments: comments,
    };
    if (mode === "edit") {
      editEmployee(employee, data["Emails"], data["Phone number"]).then(() => {
        console.log("Employee edited");
        setEditForm(false);
      });
    } else {
      addEmployee(employee).then(() => {
        console.log("Employee added");
        setEditForm(false);
      });
    }
  };

  const handleDelete = () => {
    if (mode === "edit") {
      removeEmployee(employee, data["Emails"], data["Phone number"]).then(
        () => {
          console.log("Employee removed");
          setDeleteUser(false);
          SetDeleted(true);
          setTimeout(() => {
            setEditForm(false);
          }, 4000);
        }
      );
    } else {
      setFirstName("");
      setLastName("");
      setMobilePhone("");
      setLandlinePhone("");
      setEmail("");
      setStreetAddress1("");
      setStreetAddress2("");
      setCity("");
      setZip("");
      setCounty("");
      setCountry("");
      setSelected("country");
      setComments("");
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setFirstName(data["First Name"]);
      setLastName(data["Last Name"]);
      setMobilePhone(data["Phone number"]);
      setLandlinePhone(data["Landline Phone"] || "");
      setEmail(data["Emails"]);
      setStreetAddress1(data["Street Address 1"] || "");
      setStreetAddress2(data["Street Address 2"] || "");
      setCity(data["City"] || "");
      setZip(data["Zip"] || "");
      setCounty(data["County"] || "");
      setCountry(data["Country"] || "country");
      setSelected(data["Country"] || "country");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.outer}>
      {deleted ? (
        <h1 className={styles.deleted__text}>
          The user account has been successfully deleted.
        </h1>
      ) : (
        <div className={styles.container}>
          <div className={styles.top__bar}>Candidate Profile Form</div>
          <div className={styles.main}>
            {mode === "edit" && (
              <div
                className={styles.back__button}
                onClick={() => {
                  setEditForm(false);
                }}
              >
                Back
              </div>
            )}
            <div className={styles.ticket}>12345678</div>
            <main className={styles.form}>
              <div className={styles.fields}>
                <div className={styles.name__box}>
                  <div className={styles.first__name__box}>
                    <label className={styles.first__name__label}>Name*</label>
                    <input
                      className={styles.name__input}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.first__name__box}>
                    <input
                      className={styles.name__input}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.phone__box}>
                  <div className={styles.phone__container}>
                    <label className={styles.phone__label}>Mobile Phone*</label>
                    <div className={styles.phone__input__container}>
                      <div className={styles.plus__icon}>
                        <Image alt="search icon" layout="fill" src={search} />
                      </div>
                      <input
                        className={styles.phone__input}
                        value={mobilePhone}
                        onChange={(e) => {
                          setMobilePhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.phone__container}>
                    <label className={styles.phone__label}>
                      Landline Phone*
                    </label>
                    <div className={styles.phone__input__container}>
                      <div className={styles.plus__icon}>
                        <Image alt="search icon" layout="fill" src={search} />
                      </div>
                      <input
                        className={styles.phone__input}
                        value={landlinePhone}
                        onChange={(e) => {
                          setLandlinePhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.email__box}>
                  <label className={styles.email__label}>Email*</label>
                  <input
                    className={styles.email__input}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.address__box}>
                  <label className={styles.address__label}>Address*</label>
                  <input
                    className={styles.address__input}
                    placeholder="Street Address"
                    value={streetAddress1}
                    onChange={(e) => {
                      setStreetAddress1(e.target.value);
                    }}
                  />
                  <input
                    className={styles.address__input}
                    placeholder="Street Address 2"
                    value={streetAddress2}
                    onChange={(e) => {
                      setStreetAddress2(e.target.value);
                    }}
                  />
                  <div className={styles.city__county}>
                    <input
                      className={styles.city__county__input}
                      placeholder="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <input
                      className={styles.city__county__input}
                      placeholder="County"
                      value={county}
                      onChange={(e) => {
                        setCounty(e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.zip__country}>
                    <input
                      className={styles.zipcode__input}
                      placeholder="Postcode/Zipcode"
                      value={zip}
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                    />
                    <div className={styles.country__dropdown}>
                      <button
                        className={styles.country__dropdown__button}
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        <span>{selected}</span>
                        <div className={styles.country__dropdown__arrow}>
                          <Image
                            alt="arrow"
                            layout="fill"
                            src={arrow}
                            style={{
                              transform: menuOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          />
                        </div>
                      </button>
                      {menuOpen && (
                        <div className={styles.countries__menu}>
                          {options.map((option, id) => {
                            return (
                              <div
                                key={id}
                                className={styles.country}
                                onClick={() => {
                                  setSelected(option);
                                  setMenuOpen(false);
                                  setCountry(option);
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
                <div className={styles.additional__info}>
                  <label className={styles.additional__info__label}>
                    {"Notes (use for additional information)"}
                  </label>
                  <textarea
                    className={styles.additional__info__input}
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className={styles.action__buttons}>
                  <button
                    className={styles.action__button}
                    onClick={handleSave}
                  >
                    save
                  </button>
                  <button
                    className={styles.action__button}
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </div>
              </div>
            </main>
          </div>
          <div className={styles.bottom__bar}></div>
        </div>
      )}
      {deleteUser && (
        <div className={styles.delete__user__modal}>
          <h3 className={styles.delete__user__text}>
            Are you sure you want to delete this user account?
          </h3>
          <div className={styles.delete__user__buttons}>
            <button
              className={styles.delete__user__button}
              onClick={() => setDeleteUser(false)}
              style={{ backgroundColor: "green" }}
            >
              cancel
            </button>
            <button
              className={styles.delete__user__button}
              onClick={handleDelete}
              style={{ backgroundColor: "red" }}
            >
              continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
