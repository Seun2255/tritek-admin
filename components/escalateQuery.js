import Image from "next/image";
import styles from "../styles/components/escalateQuery.module.css";
import { useState } from "react";
import arrow from "../assets/icons/arrow-black.svg";
import axios from "axios";

export default function EscalateQuery(props) {
  const { data, setEscalateQuery, setViewQuery, staff } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({ Emails: "Staff" });
  const [message, setMessage] = useState("");
  const [escalated, setEscalated] = useState(false);

  const handleSubmit = () => {
    axios
      .post("https://tritek-mail.herokuapp.com/api/escalate", {
        email: selectedStaff.Emails,
        ticket: data["Query Number"],
        query: data.Comments,
        message: message,
      })
      .then(function (response) {
        setEscalated(true);
        setTimeout(() => {
          setEscalateQueryQuery(false);
          setViewQuery(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log("Failed");
        console.log(error);
      });
  };

  return (
    <div className={styles.outer}>
      {escalated ? (
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "green" }}>
          The query has been escalated
        </h1>
      ) : (
        <>
          <div
            className={styles.back__button}
            onClick={() => {
              setEscalateQuery(false);
              setViewQuery(true);
            }}
          >
            Back
          </div>
          <div className={styles.container}>
            <div className={styles.header}>Escalate</div>
            <div className={styles.staff__box}>
              <div className={styles.home__buttons}>
                <button
                  className={styles.menu__button}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span>{selectedStaff.Emails}</span>
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
                    {staff.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.staff}
                          onClick={() => {
                            setSelectedStaff(option);
                            setMenuOpen(false);
                          }}
                        >
                          {option.Emails}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <textarea
                className={styles.escalate__message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.base}></div>
          </div>
          <div className={styles.action__buttons}>
            <button className={styles.action__button} onClick={handleSubmit}>
              Escalate
            </button>
          </div>
        </>
      )}
    </div>
  );
}
