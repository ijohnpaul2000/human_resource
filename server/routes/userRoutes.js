const router = require("express").Router();

const {
  POSTuser,
  GETusers,
  GETuser,
  PUTuser,
  DELETEuser,
} = require("../controllers/userController");

router.post("/", POSTuser);
router.get("/", GETusers);
router.get("/:id", GETuser);
router.put("/:id", PUTuser);
router.delete("/:id", DELETEuser);

module.exports = router;
