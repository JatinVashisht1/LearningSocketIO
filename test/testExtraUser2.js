import { io } from "socket.io-client";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { logger } from "../utility/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// purpose of this file is to listen to various events emitted.

const socket = io("http://localhost:5000/");
const username = "testExtraUser2";

/**
 * Listening to "users" event.
 * This event provides list of all users that are connected to server via web sockets.
 * On server side we can also provide the status of online and offline users, 
 * by comparing list of connected users with all users in database.
 */
socket.on("users", (data) => {
    logger(data, __filename);
})
