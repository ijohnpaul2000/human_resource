const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env") });

const initializeDirectory = () => {
  const directory = path.resolve(__dirname, "../" + process.env.FILES_DIR);

  if (!fs.existsSync()) {
    fs.mkdirSync(directory, { recursive: true });
  }
};
module.exports = { initializeDirectory };
