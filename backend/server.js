const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path'); // Import the 'path' module
const authRoutes = require('./routes/auth.routes.js'); 
const messageRoutes = require('./routes/message.routes.js'); 
const userRoutes = require('./routes/user.routes.js'); 
const connectToMongoDB = require('./db/connectToMongoDB.js');
const { app, server } = require('./socket/socket.js'); 

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Route all other requests to the frontend index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
