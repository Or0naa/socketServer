
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 2550
const db = require('./db')
db.connect();


// קובץ: index.js
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });
});

app.use(express.json());


const userRouter = require("./routers/user.router")
const messageRouter = require("./routers/message.router")
app.use("/user", userRouter);
app.use("/message", messageRouter);


httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  