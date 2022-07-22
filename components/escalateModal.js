import Image from "next/image";
import arrow from "../assets/icons/arrow-black.svg";
import { useState } from "react";
import styles from "../styles/components/viewQuery.module.css";
import { Axios } from "axios";

export default function EscalateModal(props) {
  const { staff } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.escalate__modal}>
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
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </button>
        {menuOpen && (
          <div className={styles.countries__menu}>
            {options.map((option, id) => {
              return (
                <div key={id} className={styles.country} onClick={() => {}}>
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
