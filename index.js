const express = require("express");
const connectToDB = require("./db");
const zipRoutes = require("./routes/zip");
const textRoutes = require("./routes/text");
const initGridFS = require("./middleware/gridFS");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Disposition"],
  })
);

app.use(express.json());

app.use("/api/zip/", initGridFS, zipRoutes);
app.use("/api/text", textRoutes);

(async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
