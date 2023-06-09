import io from "socket.io-client"

// telling socket.io-client to connect to which server.
const socket = io('http://localhost:5000/');
const username = "testBase";

/**
 * This event is listening to a "connect" event.
 */
socket.on('connect', () => {
    console.log('sent a connection request.');

    /**
     * Here we are emitting an event called "chatMessage" with some message.
     * The server will listen to this event and will use our message as required.
     */
    socket.emit('chatMessage', "This is a chat message by a client.");
    console.log(`chat message sent`);
});

/**
 * We are listening to an event named "broadcastEvent".
 * In our case this event is used to test "broadcastEvent" feature of socket io sever library.
 */
socket.on("broadcastEvent", (message) => {
    console.log(`this is message by server using broadcast event: \"${message}\" in ${username}`);
})

/**
 * Listening to a "chatMessage" event, emitted by server.
 */
socket.on('chatMessage', (message) => {
    console.log(`chat message from server in ${username}: \"${message}\"`);
})
