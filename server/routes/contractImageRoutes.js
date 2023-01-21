const router = require("express").Router();

const { getImage } = require("../controllers/contractImage");

router.get("/:filename", getImage);

module.exports = router;
