const querySorter = (data) => {
  const newQueries = [];
  const inProgressQueries = [];
  const resolvedQueries = [];

  data.map((query) => {
    if (query["Status"] === "New") {
      newQueries.push(query);
    } else if (query["Status"] === "in Progress") {
      inProgressQueries.push(query);
    } else if (query["Status"] === "Resolved") {
      resolvedQueries.push(query);
    }
  });
  return {
    New: newQueries,
    "in Progress": inProgressQueries,
    Resolved: resolvedQueries,
  };
};

export default querySorter;
