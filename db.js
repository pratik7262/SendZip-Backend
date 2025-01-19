const { MongoClient } = require("mongodb");

const URI =
  "mongodb+srv://pratik:mBM1bvIrqh3NKVVM@cluster0.4jcyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let db = null;

const connectToDB = async () => {
  if (db) return db;

  try {
    const client = new MongoClient(URI, {
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
