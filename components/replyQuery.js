import Image from "next/image";
import styles from "../styles/components/replyQuery.module.css";
import { useState } from "react";
import { useEffect } from "react";
import clip from "../assets/icons/clip.svg";
import { addQuery } from "../pages/api/API";

export default function ReplyQuery(props) {
  const { data, setReplyQuery, setViewQuery, queryId } = props;
  const [reply, setReply] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = () => {
    data["Response"] = reply;
    data["Status"] = "in Progress";
    console.log(data);
    addQuery(
      { ...data, Response: reply, Status: "in Progress" },
      data["Query Number"]
    ).then(() => {
      setReplyQuery(false);
      setViewQuery(true);
    });
  };

  const uploadFile = (event) => {
    let file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className={styles.outer}>
      <div
        className={styles.back__button}
        onClick={() => {
          setReplyQuery(false);
          setViewQuery(true);
        }}
      >
        Back
      </div>
      <div className={styles.container}>
        <div className={styles.header}>Reply</div>
        <textarea
          className={styles.reply}
          onChange={(e) => setReply(e.target.value)}
        ></textarea>
        <div className={styles.base}></div>
      </div>
      <div className={styles.action__buttons}>
        <button className={styles.action__button} onClick={handleSubmit}>
          Send
        </button>
        <label htmlFor="file" className={styles.attachment}>
          <Image alt="clip" layout="fill" src={clip} />
          <input
            className={styles.file__upload}
            type="file"
            name="attachment"
            onChange={(e) => uploadFile(e)}
            id="file"
          />
        </label>
        {file !== "" && (
          <span className={styles.file__confirmation}>{file.name}</span>
        )}
      </div>
    </div>
  );
}
