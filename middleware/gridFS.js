const { GridFSBucket } = require("mongodb");
const connectToDB = require("../db");

let bucket = null;

const initGridFS = async (req, res, next) => {
  try {
    if (!bucket) {
      const db = await connectToDB(); 
      bucket = new GridFSBucket(db, { bucketName: "uploads" });
    }
    req.bucket = bucket; 
    next();
  } catch (error) {
    console.error("Error initializing GridFS:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = initGridFS;
