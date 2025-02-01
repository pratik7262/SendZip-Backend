const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoURI =
  "mongodb+srv://pratik:mBM1bvIrqh3NKVVM@cluster0.4jcyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // if (file.mimetype !== "application/zip") {
    //   throw new Error("Only zip files are allowed");
    // }
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
