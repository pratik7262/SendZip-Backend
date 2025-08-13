# 📦 SendZip Backend

Backend API for **SendZip** — a service that allows users to transfer `.zip` files between devices online.  
Files are stored temporarily in **MongoDB** and automatically deleted after a set duration.

---

# Frontend Repo

https://github.com/pratik7262/SendZip-Frontend

## 🚀 Features

- Upload `.zip` files from any device
- Store files temporarily in MongoDB using GridFS
- Automatic file deletion after expiry
- REST API endpoints for uploading, downloading, and deleting files
- Secure file handling with size limits
- CORS-enabled for frontend access

---

## 🛠 Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Web framework)
- **MongoDB** with **GridFS** (File storage)
- **Mongoose** (ODM)
- **Multer** (File uploads)
- **dotenv** (Environment variables)
- **Node Cron** (Scheduled deletion)

---

## 📂 Project Structure

```
backend/
│── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── routes/
│   │   └── fileRoutes.js       # API endpoints
│   ├── controllers/
│   │   └── fileController.js
│   ├── middlewares/
│   │   └── upload.js           # Multer config
│   ├── utils/
│   │   └── deleteExpiredFiles.js
│   └── app.js
│── .env
│── package.json
│── README.md
```

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/sendzip-backend.git
cd sendzip-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sendzip
FILE_EXPIRY_HOURS=24
```

### 4️⃣ Start the server

```bash
npm run dev
```

---

## 📜 License

MIT License © 2025

---

## ✍ Author

**Pratik Shinde**  
🌐 [Portfolio Website](https://your-portfolio-link.com)  
💻 [GitHub](https://github.com/your-github-username)
