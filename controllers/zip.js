const { ObjectId, GridFSBucket } = require("mongodb");
const connectToDB = require("../db");

// Upload a zip file
const uploadZip = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const db = await connectToDB();
    const metadata = {
      filename: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadDate: new Date(),
    };

    // Store metadata in a collection (if needed)
    await db.collection("uploadsMetadata").insertOne(metadata);

    res.status(201).json({
      message: "File uploaded successfully",
      metadata,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const downloadZip = async (req, res) => {
  try {
    const shouldDelete = req.query.delete === "true"; // Read the 'delete' flag from query parameters
    const db = await connectToDB(); // Connect to the database
    // const bucket = new GridFSBucket(db, { bucketName: "uploads" }); // Create a new GridFS bucket instance
    // console.log(req.bucket);
    // console.log(bucket);
    console.log("Connected to database. Checking for files...");

    // Query to find files
    const files = await req.bucket.find({}).sort({ uploadDate: -1 }).toArray();
    // .find({})
    // .sort({ uploadDate: -1 })
    // .limit(1)
    // .toArray();
    console.log("Files found in database:", files);

    if (!files.length) {
      console.error("No files found in the database.");
      return res
        .status(404)
        .json({ message: "No files found in the database" });
    }

    const file = files[0]; // Get the most recent file

    // Set the content type and stream the file to the client
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    const downloadStream = req.bucket.openDownloadStream(file._id);

    console.log(`Streaming file ${file.filename} to client...`);
    downloadStream.pipe(res);

    downloadStream.on("end", async () => {
      console.log(`File ${file.filename} streamed successfully.`);
      const fileId = file._id;

      // If the 'delete' flag is true, delete the file after streaming
      if (shouldDelete === "true") {
        downloadStream.on("end", async () => {
          try {
            await bucket.delete(fileId); // Delete the file
            console.log(`File with ID ${fileId} deleted successfully.`);
          } catch (deleteError) {
            console.error(`Error deleting file: ${deleteError.message}`);
          }
        });
      }
    });

    downloadStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({ message: "Error downloading file" });
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const downloadZip = async (req, res) => {
//   const deleteAfterDownload = req.query.delete === "true"; // Check if delete flag is present
//   let client;

//   try {
//     // Connect to MongoDB
//     client = new MongoClient(mongoURI);
//     await client.connect();
//     const db = client.db(); // Default database

//     // Initialize GridFSBucket
//     const bucket = new GridFSBucket(db, { bucketName: "uploads" });

//     // Find the most recent file
//     const files = await bucket.find().sort({ uploadDate: -1 }).toArray();

//     if (!files || files.length === 0) {
//       return res.status(404).json({ message: "No files found in the database" });
//     }

//     const file = files[0]; // Get the most recent file
//     const fileId = file._id;

//     console.log("File found:", file);

//     // Stream file to the client
//     res.set({
//       "Content-Type": file.contentType,
//       "Content-Disposition": `attachment; filename="${file.filename}"`,
//     });

//     const downloadStream = bucket.openDownloadStream(fileId);
//     downloadStream.pipe(res);

//     // Handle deletion after download
//     if (deleteAfterDownload) {
//       downloadStream.on("end", async () => {
//         try {
//           await bucket.delete(fileId); // Delete the file
//           console.log(`File with ID ${fileId} deleted successfully.`);
//         } catch (deleteError) {
//           console.error(`Error deleting file: ${deleteError.message}`);
//         }
//       });
//     }

//     downloadStream.on("error", (err) => {
//       console.error(`Error streaming file: ${err.message}`);
//       res.status(500).json({ message: "Error streaming file" });
//     });
//   } catch (error) {
//     console.error(`Error in downloadZip: ${error.message}`);
//     res.status(500).json({ message: "Internal Server Error" });
//   } finally {
//     if (client) await client.close();
//   }
// };

module.exports = { uploadZip, downloadZip };
