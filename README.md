# backend

Backend for NoteShare — a real-time note-sharing app that enables users to create, edit, and share notes across devices.

## Features

- RESTful API built with Node.js and Express.js.
- MongoDB for persistent data storage.
- WebSocket integration for real-time note updates.
- Secure authentication with JWT.
- CORS configuration for cross-origin requests.

## Tech Stack

- **Node.js** — JavaScript runtime.
- **Express.js** — Web framework.
- **MongoDB** — NoSQL database.
- **Mongoose** — MongoDB object modeling.
- **Socket.io** — Real-time communication.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/backend.git

# Navigate to the project directory
cd backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

### Running the Application

```bash
# Start the development server
npm run dev

# Or start normally
npm start
```

## Scripts

```bash
# Run the server
npm start

# Run with nodemon (development)
npm run dev

# Run tests
npm test
```

## License

This project is licensed under the MIT License.

## ✨ Author

**Pratik**  
💼 [Portfolio](https://pratikshinde.in) || 🐙 [GitHub](https://github.com/pratik7262)
