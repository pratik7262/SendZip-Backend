const { MongoClient } = require("mongodb");
require("dotenv").config();

let db = null;

const connectToDB = async () => {
  if (db) return db;

  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db("test"); // Replace "Cluster0" with your database name
    console.log("MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectToDB;
