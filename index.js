const express = require("express");
const connectToDB = require("./db");
const zipRoutes = require("./routes/zip");
const initGridFS = require("./middleware/gridFS");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "https://sendzip-a03d1.firebaseapp.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Disposition"],
  })
);

app.use(express.json());

app.use("/api/zip/", initGridFS, zipRoutes);

(async () => {
  try {
    await connectToDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
