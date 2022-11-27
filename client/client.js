const io = require("socket.io-client");
const readline = require("readline");
const { addMessage, findMessage } = require("../index");

const socket = io("http://localhost:3000");

var nickname = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (input) => {
    
    if (true === input.startsWith("b;")) {
        var str = input.slice(2);
        socket.emit("broadcast", {"sender": nickname, "action": "broadcast", "msg": (str)});
    }
    else if ("q;" === input) {
        socket.emit("quit", {"sender": nickname, "action": "quit"});
    }
});

console.log("Connecting to the server...");

socket.on("connect", () => {
    nickname = process.argv[2];
    console.log("[INFO]: Welcome %s", nickname);
    socket.emit("join", {"sender": nickname, "action": "join"});
});

socket.on("disconnect", (reason) => {
    console.log("[INFO]: Client disconnected, reason: %s", reason);
});

socket.on("broadcast", (data) => {
    console.log("%s", data.msg);
});

socket.on("join", (data) => {
    console.log("[INFO]: %s has joined the chat", data.sender);
});

socket.on("quit", (data) => {
    console.log("[INFO]: %s quit the chat", data.sender);
});