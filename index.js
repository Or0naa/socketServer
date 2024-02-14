
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 2550
const db = require('./db')
db.connect();
const cors = require('cors');
const messageService = require('./services/message.service')

const { createServer } = require('node:http');

// קובץ: index.js
const { Server } = require("socket.io");

const { join } = require('node:path');

const server = createServer(app);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("New client connected");
    
    socket.on("message", (msg) => {
        console.log("message:", msg);
        messageService.addNewmessage({
            user: socket.id,
            message: msg
        })
        io.emit("newmessage", "חחח");
        
    });

    // אם רוצה להוסיף טיפול לפרישת לקוח
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});


app.use(express.json());



app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


const userRouter = require("./routers/user.router")
const messageRouter = require("./routers/message.router")

app.use("/user", userRouter);
app.use("/message", messageRouter);


httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
