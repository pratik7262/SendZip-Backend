const express = require("express");
const { sendText, getText } = require("../controllers/text");

const router = express.Router();

router.post("/sendText", sendText);

router.get("/getText/:code", getText);

module.exports = router;
