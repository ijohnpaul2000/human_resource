const expressAsyncHandler = require("express-async-handler");
const getImage = expressAsyncHandler(async (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  res.sendFile(filename, {
    root: __dirname + "/../files/contract_image",
  });
});

module.exports = {
  getImage,
};
