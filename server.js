import express from "express";
import { Socket } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = 5000;
const io = new Server(server);

app.get('/', (req, res, next) => {
    // return res.sendFile(__dirname + '/index.html');
    console.log("something happened.");
    return res.status(200).json({success: true});
});

/**
 * listening to any connection events by client.
 * This is special event that is called automatically whenever a new client is connected.
 */
io.on('connection', (socket)=>{
    console.log(`a user connected`);
    socket.on('myEvent', () => {
        console.log("yo wassup!");
        socket.emit('This is emmited.');
    });

    /**
     * this is a "chatMesssage" event, that will be sent by a client.
     */
    socket.on('chatMessage', (message) => {
        console.log(`this messasge is received: \"${message}\"`);

        /**
         * io.emit will emit "chatMessage" event globally to all users.
         * Note that this event is different from "socket.on('chatMessage'), that is intercepted from client."
         * This event is pushed to all connected clients.
         */
        io.emit('chatMessage', `this is chat message from ${socket.id}: \"${message}\"`);
        // if you only want to send message to the client who sent this event, 
        // you can use "socket.emit(...)" instead of "io.emit(...)"
    });

    /**
     * This line will broadcast events to all connected clients except the client who sent this message.
     */
    socket.broadcast.emit('broadcastEvent', "This is braodcasted event by server.");

    /**
     * This is special event, that is called automatically whenever a client is disconnected.
     */
    socket.on('disconnect', () => {
        console.log(`user disconnected, user socket id: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`server up on http://localhost:${port}`);
});