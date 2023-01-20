const moment = require("moment");

const generateFilename = (fileName) => {
  uniqueDate = moment().format("MM-DD-YYYY");
  return uniqueDate + "-" + fileName;
};

module.exports = { generateFilename };
