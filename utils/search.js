const contactSearch = (data, query) => {
  const search = query.toString().slice(0, 3);
  const results = [];
  const keys = ["First Name", "Last Name", "Emails", "Phone number", "Country"];
  data.map((item) => {
    keys.map((key) => {
      const check = item[key].slice(0, 3);
      if (search === check) results.push(item);
    });
  });
  return results;
};

const querySearch = (data, query) => {
  console.log(data);
  console.log(query);
  const search = query.slice(0, 3);
  const results = [];
  const keys = ["First Name", "Last Name", "Emails", "Phone number"];
  console.log(keys);
  data.map((item) => {
    keys.map((key) => {
      const check = item[key].slice(0, 3);
      if (search === check) results.push(item);
    });
  });
  return results;
};

export { contactSearch, querySearch };
