import { formatDate } from "./dateFunctions";
const departmentOptions = ["Admin", "Sales/Marketing", "IT"];
const reportOptions = [
  "resolution rate",
  "Time in queue",
  "Queries recieved per day",
];

const typeOptions = {
  Admin: ["Admin", "Membership", "Training & Mentorship", "General"],
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

const stringToHourTime = (timeText) => {
  var temp = timeText.split(" ");
  var temp2 = temp[0].split("/");
  var temp3 = temp[1].split(":");
  var day = temp2[0];
  var month = temp2[1];
  var year = temp2[2];
  var hour = temp3[0];
  var date = new Date(year, month, day, hour);
  return date;
};

const timeTaken = (resolved, created) => {
  var difference = (resolved - created) / 3600000;
  return difference;
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
    departmentOptions.map((department) => {
      if (title === "All") {
        reportOptions.map((report) => {
          rows.push({
            type: department,
            title: report,
            period: period,
            data: getDataset(queries, start, end, typeOptions[department]),
          });
        });
      } else {
        rows.push({
          type: department,
          title: title,
          period: period,
          data: getDataset(queries, start, end, typeOptions[department]),
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

const resolutionRateData = (data) => {
  const total = data.length;
  var resolved = 0;
  var unresolved = 0;
  data.map((query) => {
    if (query.Status === "Resolved") resolved += 1;
  });
  unresolved = total - resolved;
  resolved = (resolved / total) * 100;
  unresolved = (unresolved / total) * 100;

  const barData = {
    labels: ["Resolved", "Unresolved"],
    datasets: [
      {
        label: "Percentage",
        data: [resolved, unresolved],
        backgroundColor: ["lightblue"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        scaleLabel: {
          display: true,
          labelString: "Percentage",
        },
      },
    },
  };

  return { barData, options };
};

const getDay = (query) => {
  var day = query.created;
  day = day.split(" ");
  day = day.spli("/");
  day = day[0];
  return day;
};

const queryByDayData = (data) => {
  var days = [];
  data.map((query) => {
    if (days[days.length - 1] !== query.created.split(" ")[0]) {
      days.push(query.created.split(" ")[0]);
    }
  });
  var queries = [];
  days.map((day) => {
    var temp = 0;
    data.map((query) => {
      if (query.created.split(" ")[0] === day) {
        temp += 1;
      }
    });
    queries.push(temp);
  });

  var sets = [];
  sets.push({
    label: "queries per day",
    data: queries,
    backgroundColor: ["lightblue"],
    borderColor: "black",
    borderWidth: 1,
  });

  const barData = {
    labels: days,
    datasets: sets,
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return { barData, options };
};

const timeInQueData = (data) => {
  var time = [];
  data.map((query) => {
    var temp = timeTaken(
      stringToHourTime(query.resolved),
      stringToHourTime(query.created)
    );
    time.push(temp);
  });
  var durations = ["1-6hrs", "6-12hrs", "12-18hrs", "18-24hrs", "24hrs+"];
  var durationFrequency = [];
  durations.map((duration) => {
    var temp = 0;
    time.map((time) => {
      if (duration === "1-6hrs") {
        if (time < 6 && time >= 1) temp += 1;
      } else if (duration === "6-12hrs") {
        if (time < 12 && time >= 6) temp += 1;
      } else if (duration === "12-18hrs") {
        if (time < 18 && time >= 12) temp += 1;
      } else if (duration === "18-24hrs") {
        if (time < 24 && time >= 18) temp += 1;
      } else if (duration === "24hrs+") {
        if (time >= 24) temp += 1;
      }
    });
    durationFrequency.push(temp);
  });

  var sets = [];
  sets.push({
    label: "time in que",
    data: durationFrequency,
    backgroundColor: ["lightblue"],
    borderColor: "black",
    borderWidth: 1,
  });

  const barData = {
    labels: durations,
    datasets: sets,
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return { barData, options };
};

const excelCreator = (data) => {
  var temp = [...data];
  var array = [];
  temp.map((row) => {
    array.push({ type: row.type, title: row.title, period: row.period });
  });
  return array;
};

export {
  getRows,
  resolutionRateData,
  queryByDayData,
  timeInQueData,
  excelCreator,
};
