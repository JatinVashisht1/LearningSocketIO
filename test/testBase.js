import io from "socket.io-client"
import { logger } from "../utility/logger.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// telling socket.io-client to connect to which server.
const socket = io('http://localhost:5000/');
const username = "testBase";

/**
 * This event is listening to a "connect" event.
 * The reason why this event is automatically emitted is beause of socket.io-client library (answered by chat GPT).
 */
socket.on('connect', () => {
    logger('sent a connection request. THIS IS A MESSAGE IN CONNECT EVENT.', __filename);

    /**
     * Here we are emitting an event called "chatMessage" with some message.
     * The server will listen to this event and will use our message as required.
     */
    socket.emit('chatMessage', "This is a chat message by a client.");
    logger(`chat message sent`, __filename);
});

/**
 * We are listening to an event named "broadcastEvent".
 * In our case this event is used to test "broadcastEvent" feature of socket io sever library.
 */
socket.on("broadcastEvent", (message) => {
    logger(`this is message by server using broadcast event: \"${message}\" in ${username}`, __filename);
})

/**
 * Listening to a "chatMessage" event, emitted by server.
 */
socket.on('chatMessage', (message) => {
    logger(`chat message from server in ${username}: \"${message}\"`, __filename);
})
