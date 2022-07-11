import Image from "next/image";
import styles from "../../styles/forms/candidate-profile-form.module.css";
import { useState } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import microphone from "../../assets/icons/microphone.svg";
import profile from "../../assets/icons/profile.svg";

const UserBox = () => {
  const options = ["My Settings", "Options", "Add Image", "Change Password"];
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.user__and__search}>
      <div className={styles.search__box}>
        <div className={styles.search__icon}>
          <Image alt="search icon" layout="fill" src={search} />
        </div>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search"
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
                      setOption(option);
                      setCurrentView("");
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
  );
};

export default function CandidateProfileForm() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("country");
  const options = ["Germany", "America", "Japan", "Nigeria", "China"];

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>Candidate Profile Form</div>
      <div className={styles.main}>
        <UserBox />
        <main className={styles.form}>
          <div className={styles.fields}>
            <div className={styles.name__box}>
              <div className={styles.first__name__box}>
                <label className={styles.first__name__label}>Name*</label>
                <input
                  className={styles.name__input}
                  placeholder="First Name"
                />
              </div>
              <div className={styles.first__name__box}>
                <input className={styles.name__input} placeholder="Last Name" />
              </div>
            </div>
            <div className={styles.phone__box}>
              <div className={styles.phone__container}>
                <label className={styles.phone__label}>Mobile Phone*</label>
                <div className={styles.phone__input__container}>
                  <div className={styles.plus__icon}>
                    <Image alt="search icon" layout="fill" src={search} />
                  </div>
                  <input className={styles.phone__input} />
                </div>
              </div>
              <div className={styles.phone__container}>
                <label className={styles.phone__label}>Landline Phone*</label>
                <div className={styles.phone__input__container}>
                  <div className={styles.plus__icon}>
                    <Image alt="search icon" layout="fill" src={search} />
                  </div>
                  <input className={styles.phone__input} />
                </div>
              </div>
            </div>
            <div className={styles.email__box}>
              <label className={styles.email__label}>Email*</label>
              <input className={styles.email__input} />
            </div>
            <div className={styles.address__box}>
              <label className={styles.address__label}>Address*</label>
              <input
                className={styles.address__input}
                placeholder="Street Address"
              />
              <input
                className={styles.address__input}
                placeholder="Street Address 2"
              />
              <div className={styles.city__county}>
                <input
                  className={styles.city__county__input}
                  placeholder="City"
                />
                <input
                  className={styles.city__county__input}
                  placeholder="County"
                />
              </div>
              <div className={styles.zip__country}>
                <input
                  className={styles.zipcode__input}
                  placeholder="Postcode/Zipcode"
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
              <textarea className={styles.additional__info__input}></textarea>
            </div>
          </div>
        </main>
        <div className={styles.action__buttons}>
          <button className={styles.action__button}>submit</button>
          <button className={styles.action__button}>delete</button>
        </div>
      </div>
      <div className={styles.bottom__bar}></div>
    </div>
  );
}
