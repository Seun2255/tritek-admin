export default function InsightDashboard(props) {
  const { data, styles } = props;
  const keyData = [
    {
      performance: "%- Good (94% to 100%)",
      improvement: "v- decline in performance over past 6months",
    },
    {
      performance: "%- Requires improvement (79% to 93.9%)",
      improvement: ">- performance maintained over past 6 months",
    },
    {
      performance: "%- Unsatisfactory (0% to 78.9%)",
      improvement: "^- performance improved over past 6 months ",
    },
    {
      performance: "",
      improvement: "",
    },
  ];
  return (
    <div className={styles.insight__dashboard}>
      <div className={styles.insight__container}>
        <label className={styles.container__label}></label>
        <h3 className={styles.table__name}></h3>
        <table className={styles.table}>
          <thead style={{ backgroundColor: "#CCCCCC" }}>
            <tr className={styles.table__head}>
              <td className={styles.table__cell} style={{ borderLeft: "none" }}>
                Performance
              </td>
              <td className={styles.table__cell}>Improvement</td>
            </tr>
          </thead>
          <tbody>
            {keyData.map((row, index) => {
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
                    {row.performance}
                  </td>
                  <td className={styles.table__cell}>{row.improvement}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className={styles.filter__button}>Download Pdf</button>
      <div className={styles.insight__container}>
        <label className={styles.container__label}></label>
        <h3 className={styles.table__name}></h3>
        <table className={styles.table}>
          <thead style={{ backgroundColor: "#CCCCCC" }}>
            <tr className={styles.table__head}>
              <td className={styles.table__cell} style={{ borderLeft: "none" }}>
                Performance
              </td>
              <td className={styles.table__cell}>Improvement</td>
            </tr>
          </thead>
          <tbody>
            {keyData.map((row, index) => {
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
                    {row.performance}
                  </td>
                  <td className={styles.table__cell}>{row.improvement}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
