const router = require("express").Router();
const fileUpload = require("express-fileupload");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/files/contract_image");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  POSTcontract,
  GETContracts,
} = require("../controllers/contractController");
router.post("/", upload.single("contract_image"), POSTcontract);
router.get("/", GETContracts);

module.exports = router;
