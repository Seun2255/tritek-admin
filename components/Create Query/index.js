import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/components/Create Query/newQuery.module.css";
import CandidateProfileForm from "./candidate-profile-form";
import CandidateQueryForm from "./candidate-query-form";
import StatementForm from "./statement-form";

export default function NewQuery(props) {
  const { closeForm } = props;
  const [form, setForm] = useState("statement");
  const [ticket, setTicket] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const changeForm = (next) => {
    setForm(next);
  };

  return (
    <div className={styles.container}>
      {form === "statement" && (
        <StatementForm changeForm={changeForm} setTicket={setTicket} />
      )}
      {form === "profile" && (
        <CandidateProfileForm
          changeForm={changeForm}
          setUserDetails={setUserDetails}
          ticket={ticket}
        />
      )}
      {form === "query" && (
        <CandidateQueryForm
          changeForm={changeForm}
          ticket={ticket}
          userDetails={userDetails}
          closeForm={closeForm}
        />
      )}
    </div>
  );
}
