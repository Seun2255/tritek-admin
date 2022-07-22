import Image from "next/image";
import calendar from "../../assets/icons/calendar.svg";
import styles from "../../styles/components/reports.module.css";
import arrow from "../../assets/icons/arrow-black.svg";
import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../../utils/dateFunctions";
import ChartDashboard from "./chartDashboard";
import InsightDashboard from "./insightDashboard";

export default function Reports() {
  const [departmentMenuOpen, setDepartmentMenuOpen] = useState(false);
  const [titleMenuOpen, setTitleMenuOpen] = useState(false);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedTitle, setSelectedTitle] = useState("Report Title*");
  const [selectedAgent, setSelectedAgent] = useState("Agent(Optional)");
  const departmentOptions = ["All", "Admin", "Sales/Marketing", "IT"];
  const titleOptions = [
    "All",
    "First response time",
    "Ticket backlog",
    "resolution rate",
    "Contact volume by channel",
    "Time in queue",
    "Queries recieved per day",
  ];
  const agentOptions = ["None", "John", "Hanah", "James", "Amanda"];
  const [dashboard, setDashboard] = useState("chart");
  const [unfilled, setUnFilled] = useState(false);
  const [fromValue, setFromValue] = useState(new Date());
  const [toValue, setToValue] = useState(new Date());
  const [calendar1Open, setCalendar1Open] = useState(false);
  const [calendar2Open, setCalendar2Open] = useState(false);
  const [fillUPArray, setFillUpArray] = useState([]);
  const data = [{ Department: "Admin", Report: "Ticket Backlog" }];

  const fillUp = () => {
    var array = [];
    if (data.length < 8) {
      for (var i = 0; i < 8 - data.length; i++) {
        array.push({
          Department: "",
          Report: "",
          Period: "",
        });
      }
    }
    setFillUpArray(array);
  };

  useEffect(() => {
    fillUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDateClick = (which) => {
    if (which === "from") {
      setCalendar2Open(false);
      setCalendar1Open(true);
    } else {
      setCalendar1Open(false);
      setCalendar2Open(true);
    }
  };

  const handleFromDateChange = (value) => {
    setFromValue(value);
    setCalendar1Open(false);
  };

  const handleToDateChange = (value) => {
    setToValue(value);
    setCalendar2Open(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>Reports</div>
      <main className={styles.main}>
        <div className={styles.switch}>
          <button
            className={styles.switch__button}
            style={{
              borderRight: "2px solid black",
              backgroundColor: dashboard === "chart" ? "#6FA8DC" : "white",
            }}
            onClick={() => setDashboard("chart")}
          >
            Chart Dashboard
          </button>
          <button
            className={styles.switch__button}
            style={{
              backgroundColor: dashboard === "insight" ? "#6FA8DC" : "white",
            }}
            onClick={() => setDashboard("insight")}
          >
            Insight Dashboard
          </button>
        </div>
        <div className={styles.filters}>
          <h2 className={styles.filter__head}>
            To filter reports, please use the filters provided.
          </h2>
          <div className={styles.filter__options}>
            <div className={styles.dropdowns}>
              {/* Department dropdown */}
              <div className={styles.filter__dropdown}>
                <button
                  className={styles.filter__dropdown__button}
                  onClick={() => setDepartmentMenuOpen(!departmentMenuOpen)}
                >
                  <span>{selectedDepartment}</span>
                  <div className={styles.filter__dropdown__arrow}>
                    <Image
                      alt="arrow"
                      layout="fill"
                      src={arrow}
                      style={{
                        transform: departmentMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </button>
                {departmentMenuOpen && (
                  <div className={styles.dropdown__menu}>
                    {departmentOptions.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.dropdown__item}
                          onClick={() => {
                            setSelectedDepartment(option);
                            setDepartmentMenuOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Title dropdown */}
              <div className={styles.filter__dropdown}>
                <button
                  className={styles.filter__dropdown__button}
                  onClick={() => setTitleMenuOpen(!titleMenuOpen)}
                >
                  <span>{selectedTitle}</span>
                  <div className={styles.filter__dropdown__arrow}>
                    <Image
                      alt="arrow"
                      layout="fill"
                      src={arrow}
                      style={{
                        transform: titleMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </button>
                {titleMenuOpen && (
                  <div className={styles.dropdown__menu}>
                    {titleOptions.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.dropdown__item}
                          onClick={() => {
                            setSelectedTitle(option);
                            setTitleMenuOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Agent dropdown */}
              <div className={styles.filter__dropdown}>
                <button
                  className={styles.filter__dropdown__button}
                  onClick={() => setAgentMenuOpen(!agentMenuOpen)}
                >
                  <span>
                    {selectedAgent === "None"
                      ? "Agent(Optional)"
                      : selectedAgent}
                  </span>
                  <div className={styles.filter__dropdown__arrow}>
                    <Image
                      alt="arrow"
                      layout="fill"
                      src={arrow}
                      style={{
                        transform: agentMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </button>
                {agentMenuOpen && (
                  <div className={styles.dropdown__menu}>
                    {agentOptions.map((option, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.dropdown__item}
                          onClick={() => {
                            setSelectedAgent(option);
                            setAgentMenuOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {unfilled && (
                <div className={styles.filters__unfilled}>
                  Please complete mandatory fields*
                </div>
              )}
            </div>
            <div className={styles.period}>
              <div
                className={styles.to__from}
                onClick={() => {
                  handleDateClick("from");
                }}
              >
                <label className={styles.to__from__label}>From*</label>
                <div className={styles.to__from__display}>
                  {formatDate(fromValue)}
                </div>
                <div className={styles.calendar__icon}>
                  <Image alt="calendar icon" layout="fill" src={calendar} />
                </div>
                {calendar1Open && (
                  <div className={styles.calendar}>
                    <Calendar
                      onChange={(value) => handleFromDateChange(value)}
                      value={fromValue}
                    />
                  </div>
                )}
              </div>
              <div
                className={styles.to__from}
                onClick={() => {
                  handleDateClick("to");
                }}
              >
                <label className={styles.to__from__label}>To*</label>
                <div className={styles.to__from__display}>
                  {formatDate(toValue)}
                </div>
                <div className={styles.calendar__icon}>
                  <Image alt="calendar icon" layout="fill" src={calendar} />
                </div>
                {calendar2Open && (
                  <div className={styles.calendar}>
                    <Calendar
                      onChange={(value) => handleToDateChange(value)}
                      value={toValue}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.filter__buttons}>
            <button className={styles.filter__button}>Generate Report</button>
            <button className={styles.filter__button}>Clear</button>
          </div>
        </div>
        {dashboard === "chart" ? (
          <ChartDashboard
            data={data}
            fillUPArray={fillUPArray}
            styles={styles}
            fromValue={fromValue}
            toValue={toValue}
          />
        ) : (
          <InsightDashboard data={data} styles={styles} />
        )}
      </main>
    </div>
  );
}
