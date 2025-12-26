const router = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const controller = require("../controllers/resume.controller");

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("resume"), controller.uploadResume);

module.exports = router;
