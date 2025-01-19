const { GridFSBucket } = require("mongodb");
const connectToDB = require("../db");

let bucket = null;

const initGridFS = async (req, res, next) => {
  try {
    if (!bucket) {
      const db = await connectToDB(); // Ensure the database connection is established
      bucket = new GridFSBucket(db, { bucketName: "uploads" });
    }
    req.bucket = bucket; // Attach the bucket instance to the request
    next();
  } catch (error) {
    console.error("Error initializing GridFS:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = initGridFS;
