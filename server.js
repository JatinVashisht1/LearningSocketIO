import express from "express";
import { Socket } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
import { logger } from "./utility/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = 5000;
const io = new Server(server);

app.get('/', (req, res, next) => {
    // return res.sendFile(__dirname + '/index.html');
    logger("something happened.", __filename);
    return res.status(200).json({success: true});
});

/**
 * listening to any connection events by client.
 * This is special event that is called automatically whenever a new client is connected.
 */
io.on('connection', (socket)=>{
    logger(`a user connected`);
    socket.on('myEvent', () => {
        logger("yo wassup!", __filename);
        socket.emit('This is emmited.');
    });

    /**
     * this is a "chatMesssage" event, that will be sent by a client.
     */
    socket.on('chatMessage', (message) => {
        logger(`this messasge is received: \"${message}\"`, __filename);

        /**
         * io.emit will emit "chatMessage" event globally to all users.
         * Note that this event is different from "socket.on('chatMessage'), that is intercepted from client."
         * This event is pushed to all connected clients.
         */
        io.emit('chatMessage', `this is chat message from ${socket.id}: \"${message}\"`);
        // if you only want to send message to the client who sent this event, 
        // you can use "socket.emit(...)" instead of "io.emit(...)"
    });

    const users = [];
    
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            id: id,
            username: "Placeholder value"
        });
    }

    socket.emit("users", users);

    /**
     * This event listens to any private message being sent by a user to any other user.
     * This will send the message to recipient accordingly.
     */
    socket.on("private message", ({content, to})=> {
        /**
         * This code snippet is used to emit a message to a chat room
         * socket.to(...) a feature in socket io called rooms.
         * we can create our own rooms also.
         * The logic of rooms is on server side of application only, presentation layer should not be aware of it.
         */
        socket.to(to).emit("private message", {
            content,
            from: socket.id
        });
    })

    /**
     * This line will broadcast events to all connected clients except the client who sent this message.
     */
    socket.broadcast.emit('broadcastEvent', "This is braodcasted event by server.");

    /**
     * This is special event, that is called automatically whenever a client is disconnected.
     */
    socket.on('disconnect', () => {
        logger(`user disconnected, user socket id: ${socket.id}`, __filename);
    });
});

server.listen(port, () => {
    logger(`server up on http://localhost:${port}`, __filename);
});