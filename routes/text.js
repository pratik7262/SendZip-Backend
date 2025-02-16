const express = require("express");
const {
  sendText,
  getText,
  sendTextWithoutCode,
  getTextWithoutCode,
} = require("../controllers/text");

const router = express.Router();

router.post("/sendText", sendText);

router.get("/getText/:code", getText);

router.post("/sendTextWithoutCode", sendTextWithoutCode);

router.get("/getTextWithoutCode", getTextWithoutCode);

module.exports = router;
