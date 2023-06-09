import io from "socket.io-client"

const socket = io('http://localhost:5000/');
const username = 'eu1';

/**
 * This event is listening to a "connect" event.
 */
socket.on('connect', () => {
    console.log(`sent a connection request by ${username}.`);

    /**
     * Here we are emitting an event called "chatMessage" with some message.
     * The server will listen to this event and will use our message as required.
     */
    socket.emit('chatMessage', `This is a chat message by a client ${username}.`);
    console.log(`chat message sent by ${username}`);
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