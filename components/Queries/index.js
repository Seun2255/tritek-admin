import Image from "next/image";
import styles from "../../styles/components/Queries/queries.module.css";
import clip from "../../assets/icons/clip.svg";
import { useState } from "react";
import { useEffect } from "react";
import ViewQuery from "./viewQuery";
import ReplyQuery from "./replyQuery";
import EscalateQuery from "./escalateQuery";
import { querySearch } from "../../utils/search";
import axios from "axios";
import download from "downloadjs";
import getFileName from "../../utils/getFileName";

export default function Queries(props) {
  const { data, staff } = props;
  const [viewQuery, setViewQuery] = useState(false);
  const [replyQuery, setReplyQuery] = useState(false);
  const [escalateQuery, setEscalateQuery] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState({});
  const [selectedQueryId, setSelectedQueryId] = useState(0);
  const [fillUPArray, setFillUpArray] = useState([]);
  const fillUp = () => {
    var array = [];
    if (data.length < 12) {
      for (var i = 0; i < 12 - data.length; i++) {
        array.push({
          "First Name": "",
          "Last Name": "",
          "Query Number": "",
          "Query Source": "",
          "Query Type": "",
          Subject: "",
          "Phone number": "",
          Emails: "",
          Location: "",
          Status: "",
          Comments: "",
          Attachment: "",
        });
      }
    }
    setFillUpArray(array);
  };

  useEffect(() => {
    fillUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function downloadFile(file) {
    axios({
      url: file,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const content = response.headers["content-type"];
      download(response.data, getFileName(file), content);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Queries - New, In progress, Resolved</div>
      <section className={styles.table__container}>
        <table className={styles.table}>
          <thead style={{ backgroundColor: "#CCCCCC" }}>
            <tr className={styles.table__head}>
              <td style={{ fontWeight: 700, color: "#293986" }}>Name</td>
              <td className={styles.table__cell}>Ticket Number</td>
              <td className={styles.table__cell}>Address</td>
              <td className={styles.table__cell}>Email</td>
              <td className={styles.table__cell}>Phone Number</td>
              <td className={styles.table__cell}>Created</td>
              <td className={styles.table__cell}>Attachment</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr
                  className={styles.table__row}
                  key={index}
                  style={{
                    backgroundColor: index % 2 ? "white" : "#DDDDDD",
                  }}
                  onClick={() => {
                    setSelectedQuery(row);
                    setSelectedQueryId(index);
                    setViewQuery(true);
                  }}
                >
                  <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                  <td className={styles.table__cell}>{row["Query Number"]}</td>
                  <td className={styles.table__cell}>{row["Location"]}</td>
                  <td className={styles.table__cell}>{row["Emails"]}</td>
                  <td className={styles.table__cell}>{row["Phone number"]}</td>
                  <td className={styles.table__cell}>{row["created"]}</td>
                  <td
                    className={styles.table__cell}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(row["Attachment"]);
                    }}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {row["Attachment"] ? (
                      <div
                        style={{
                          width: "30px",
                          height: "20px",
                          position: "relative",
                          zIndex: 10,
                          display: "block",
                          margin: "0 auto",
                        }}
                      >
                        <Image src={clip} alt="clip" layout="fill" />
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
            {fillUPArray.map((row, index) => {
              return (
                <tr
                  className="table__row"
                  key={index}
                  style={{
                    backgroundColor:
                      data.length % 2
                        ? index % 2
                          ? "#DDDDDD"
                          : "white"
                        : index % 2
                        ? "white"
                        : "#DDDDDD",
                  }}
                >
                  <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                  <td className={styles.table__cell}>{row["Query Number"]}</td>
                  <td className={styles.table__cell}>{row["Location"]}</td>
                  <td className={styles.table__cell}>{row["Emails"]}</td>
                  <td className={styles.table__cell}>{row["Phone number"]}</td>
                  <td className={styles.table__cell}></td>
                  <td className={styles.table__cell}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <div className={styles.pagination}>
        <button
          className={styles.back}
          style={{
            backgroundColor: "#6FA8DC",
            width: "4em",
            borderLeft: "2px solid black",
          }}
        >
          {"<<"}
        </button>
        <button className={styles.back}>{"<"}</button>
      </div>
      {viewQuery && (
        <ViewQuery
          setViewQuery={setViewQuery}
          data={selectedQuery}
          setReplyQuery={setReplyQuery}
          setEscalateQuery={setEscalateQuery}
        />
      )}
      {replyQuery && (
        <ReplyQuery
          data={selectedQuery}
          setReplyQuery={setReplyQuery}
          setViewQuery={setViewQuery}
        />
      )}
      {escalateQuery && (
        <EscalateQuery
          data={selectedQuery}
          setEscalateQuery={setEscalateQuery}
          setViewQuery={setViewQuery}
          staff={staff}
        />
      )}
    </div>
  );
}
