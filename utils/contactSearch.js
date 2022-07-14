const contactSearch = (data, query) => {
  const search = query.slice(0, 3);
  const results = [];
  const keys = Object.keys(data[0]);
  data.map((item) => {
    keys.map((key) => {
      const check = item[key].slice(0, 3);
      if (search === check) results.push(item);
    });
  });
  return results;
};

export default contactSearch;
