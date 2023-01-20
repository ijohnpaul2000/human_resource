const router = require("express").Router();
const fileUpload = require("express-fileupload");

const { POSTcontract } = require("../controllers/contractController");

router.post(
  "/",
  fileUpload({
    createParentPath: true,
  }),
  POSTcontract
);

module.exports = router;
