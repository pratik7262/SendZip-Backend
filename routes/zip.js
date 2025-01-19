const express = require("express");
const { downloadZip, uploadZip } = require("../controllers/zip");
const upload = require("../middleware/multerConfig");
const router = express.Router();

router.post("/uploadZip", upload.single("file"), uploadZip);

router.get("/downloadZip", downloadZip);

module.exports = router;
