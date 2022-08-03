function getFileName(url) {
  var name = url.split("/");
  name = name[name.length - 1];
  return name.split(".")[0];
}

export default getFileName;
