import { formatDate } from "../../utils/dateFunctions";
import styles from "../../styles/components/Reports/chart.module.css";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import {
  resolutionRateData,
  queryByDayData,
  timeInQueData,
  excelCreator,
} from "../../utils/reportCreators";
import { useState, useRef } from "react";

export default function ChartDashboard(props) {
  const { data, fillUPArray } = props;
  const [barData, setBarData] = useState([]);
  const [options, setOptions] = useState({});
  const [selected, setSelected] = useState("");
  const [current, setCurrent] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const ref = useRef();
  var excelData = excelCreator(data);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const viewChart = () => {
    if (chartOpen && current === selected) {
      setChartOpen(false);
    } else {
      var rowData = data[selected].data;
      setCurrent(selected);
      var temp = {};
      console.log(data[selected].title);
      console.log(data[selected]);
      if (data[selected].title === "Queries recieved per day") {
        temp = queryByDayData(rowData);
      } else if (data[selected].title === "resolution rate") {
        temp = resolutionRateData(rowData);
      } else if (data[selected].title === "Time in queue") {
        temp = timeInQueData(rowData);
      }
      setBarData(temp.barData);
      setOptions(temp.options);
      setChartOpen(true);
    }
  };

  const headers = [
    { label: "Department", key: "type" },
    { label: "Report", key: "title" },
    { label: "Period", key: "period" },
  ];

  return (
    <div className={styles.outer}>
      <div className={styles.chart__action__buttons}>
        <button className={styles.chart__action__button} onClick={handlePrint}>
          Download pdf
        </button>
        <CSVLink
          data={excelData}
          headers={headers}
          filename={"report.csv"}
          target="_blank"
        >
          <button className={styles.chart__action__button}>
            Download excel
          </button>
        </CSVLink>

        <button className={styles.chart__action__button} onClick={viewChart}>
          view
        </button>
      </div>
      <div className={styles.chart__dashboard} ref={ref}>
        {chartOpen && (
          <div className={styles.container} style={{ marginTop: "20px" }}>
            <label className={styles.container__label}>Results</label>
            <Bar data={barData} options={options} />
          </div>
        )}
        <div className={styles.table__container}>
          <table className={styles.table}>
            <thead style={{ backgroundColor: "#CCCCCC" }}>
              <tr className={styles.table__head}>
                <td
                  className={styles.table__cell}
                  style={{ borderLeft: "none" }}
                >
                  Department
                </td>
                <td className={styles.table__cell}>Report</td>
                <td className={styles.table__cell}>Period</td>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr
                    className={styles.table__row}
                    key={index}
                    style={{
                      backgroundColor:
                        index === selected
                          ? "#6fa8dc"
                          : index % 2
                          ? "white"
                          : "#DDDDDD",
                    }}
                    onClick={() => setSelected(index)}
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
    </div>
  );
}
