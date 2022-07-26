import Image from "next/image";
import styles from "../../styles/components/Create Query/candidate-query-form.module.css";
import { useState, useEffect } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import clip from "../../assets/icons/clip.svg";

export default function CandidateQueryForm(props) {
  const { changeForm, data } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState("");
  const [queryType, setQueryType] = useState("xyz");
  const escalateOptions = ["Admin Manager", "ICT", "Sales", "Resolved"];
  const typeOptions = ["ICT Dept", "Sales/Marketing", "Admin"];
  const [ticked, setTicked] = useState("");

  const handleSave = () => {};

  const handleDelete = () => {
    if (mode === "edit") {
    } else {
    }
  };

  const handleTick = (option) => {
    if (ticked === option) {
      setTicked("");
    } else {
      setTicked(option);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>Candidate Query Form</div>
      <div className={styles.main}>
        <div className={styles.ticket}>12345678</div>
        <div className={styles.fields}>
          <div className={styles.query__details}>
            <div className={styles.query__type__box}>
              <label className={styles.query__type__label}>Query type*</label>
              <div className={styles.query__type__dropdown}>
                <button
                  className={styles.query__type__dropdown__button}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span>{queryType}</span>
                  <div className={styles.query__type__dropdown__arrow}>
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
                  <div className={styles.query__type__menu}>
                    {typeOptions.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.query__type}
                          onClick={() => {
                            setQueryType(option);
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
            <div className={styles.query__options}>
              <div className={styles.option__box}>
                <div className={styles.tick__box}></div>
                <button className={styles.option__button}>New</button>
              </div>
              <div className={styles.option__box}>
                <div className={styles.clip}>
                  <Image alt="clip" layout="fill" src={clip} />
                </div>
                <button className={styles.option__button}>Attach</button>
              </div>
              <div className={styles.escalate__label}>Escalate*</div>
              <div className={styles.escalate__box}>
                {escalateOptions.map((option, id) => {
                  return (
                    <div className={styles.option__box} key={id}>
                      <input
                        type="checkbox"
                        checked={ticked === option ? true : false}
                        className={styles.tick__box}
                        onClick={() => handleTick(option)}
                      />
                      <button
                        className={styles.option__button}
                        onClick={() => handleTick(option)}
                      >
                        {option}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.query__info}>
            <label className={styles.query__info__label}>
              {"Notes (add full query details)"}
            </label>
            <textarea
              className={styles.query__info__input}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={styles.action__buttons}>
            <button className={styles.action__button}>submit</button>
            <button className={styles.action__button}>delete</button>
          </div>
        </div>
      </div>
      <div className={styles.bottom__bar}></div>
    </div>
  );
}
