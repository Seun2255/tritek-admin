import { formatDate } from "./dateFunctions";
const departmentOptions = ["Admin", "Sales/Marketing", "IT"];
const reportOptions = [
  "First response time",
  "Ticket backlog",
  "resolution rate",
  "Contact volume by channel",
  "Time in queue",
  "Queries recieved per day",
];

const typeOptions = {
  All: ["General", "Admin", "Technical", "Training & Mentorship", "ICT Dept"],
  Admin: ["Admin", "Membership", "Training & Mentorship"],
  "Sales/Marketing": ["Sales"],
  IT: ["Technical", "ICT Dept"],
};

const stringToTime = (timeText) => {
  var temp = timeText.split(" ");
  var temp2 = temp[0].split("/");
  var day = temp2[0];
  var month = temp2[1];
  var year = temp2[2];
  var date = new Date(year, month, day);
  return date;
};

const rangeSort = (queries, start, end) => {
  var temp = [];
  var startDate = start;
  var endDate = end;
  queries.map((query) => {
    var date;
    query.created
      ? (date = stringToTime(query.created))
      : (date = new Date(1972, 6, 4));
    date.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    if (
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime()
    ) {
      temp.push(query);
    }
  });
  return temp;
};

const getDataset = (queries, start, end, types) => {
  var data = rangeSort(queries, start, end);
  var temp = [];
  data.map((query) => {
    types.map((type) => {
      if (query.Type === type) temp.push(query);
    });
  });
  return temp;
};

const getRows = (type, title, start, end, queries) => {
  const period = `${formatDate(start)} - ${formatDate(end)}`;
  var rows = [];
  if (type === "All") {
    var data = getDataset(queries, start, end, typeOptions[type]);
    departmentOptions.map((department) => {
      if (title === "All") {
        reportOptions.map((report) => {
          rows.push({
            type: department,
            title: report,
            period: period,
            data: data,
          });
        });
      } else {
        rows.push({
          type: department,
          title: title,
          period: period,
          data: data,
        });
      }
    });
  } else {
    var data = getDataset(queries, start, end, typeOptions[type]);
    if (title === "All") {
      reportOptions.map((report) => {
        rows.push({ type: type, title: report, period: period, data: data });
      });
    } else {
      rows.push({ type: type, title: title, period: period, data: data });
    }
  }
  return rows;
};

export default getRows;
