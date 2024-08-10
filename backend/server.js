import 'dotenv/config';
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js'
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config();
// Middleware to parse JSON
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)

// Optionally, you can enable a root route
// app.get("/", (req, res) => {
//     res.send("Hello World!!");
// });

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
