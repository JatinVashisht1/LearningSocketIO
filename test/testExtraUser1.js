import io from "socket.io-client"
import { logger } from "../utility/logger.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const socket = io('http://localhost:5000/');
const username = 'eu1';

/**
 * This event is listening to a "connect" event.
 */
socket.on('connect', () => {
    logger(`sent a connection request by ${username}.`, __filename);

    /**
     * Here we are emitting an event called "chatMessage" with some message.
     * The server will listen to this event and will use our message as required.
     */
    socket.emit('chatMessage', `This is a chat message by a client ${username}.`);
    logger(`chat message sent by ${username}`, __filename);
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