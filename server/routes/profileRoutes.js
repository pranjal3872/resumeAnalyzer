const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/profileController");

router.get("/", auth, getProfile);

module.exports = router;