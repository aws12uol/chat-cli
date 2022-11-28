const io = require("socket.io-client");
const readline = require("readline");
const { addMessage, findMessage } = require("../index");

// const socket = io("http://51.105.32.11:3000");
const socket = io("http://localhost:3000"); 

var clientName = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (input) => {
    
    if (true === input.startsWith("b>")) {
        var message = input.slice(2);

        const date = new Date().toLocaleDateString();

        addMessage({message, sender:clientName, date})
                .then((data) => {
                    socket.emit("broadcast", {"sender": clientName, "action": "broadcast", "msgID": data});
                })
    }
    else if ("q!" === input) {
        socket.emit("quit", {"sender": clientName, "action": "quit"});
    }
});

console.info("Connecting to the server...");

socket.on("connect", () => {
    clientName = process.argv[2];
    console.info("Welcome %s", clientName);
    socket.emit("join", {"sender": clientName, "action": "join"});
});

socket.on("disconnect", (reason) => {
    console.info("Client disconnected: %s", reason);
});

socket.on("broadcast", (data) => {
    findMessage(data.msgID)
        .then((msg) => {
            console.info("%s", msg.sender, "said - ", msg.message);
        })
    
});

socket.on("join", (data) => {
    console.info("%s has joined the chat", data.sender);
});

socket.on("quit", (data) => {
    console.info("%s quit the chat", data.sender);
});