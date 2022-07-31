import { formatDate } from "../../utils/dateFunctions";
import styles from "../../styles/components/Reports/chart.module.css";

export default function ChartDashboard(props) {
  const { data, fillUPArray, fromValue, toValue } = props;
  return (
    <div className={styles.chart__dashboard}>
      <div className={styles.chart__action__buttons}>
        <button className={styles.chart__action__button}>Download pdf</button>
        <button className={styles.chart__action__button}>Download excel</button>
        <button className={styles.chart__action__button}>view</button>
      </div>
      <div className={styles.table__container}>
        <table className={styles.table}>
          <thead style={{ backgroundColor: "#CCCCCC" }}>
            <tr className={styles.table__head}>
              <td className={styles.table__cell} style={{ borderLeft: "none" }}>
                Department
              </td>
              <td className={styles.table__cell}>Report</td>
              <td className={styles.table__cell}>Period.</td>
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
                >
                  <td
                    className={styles.table__cell}
                    style={{ borderLeft: "none" }}
                  >
                    {row.type}
                  </td>
                  <td className={styles.table__cell}>{row.title}</td>
                  <td className={styles.table__cell}>{row.period}</td>
                </tr>
              );
            })}
            {fillUPArray.map((row, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 ? "#DDDDDD" : "white",
                  }}
                >
                  <td></td>
                  <td className={styles.table__cell}></td>
                  <td className={styles.table__cell}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
