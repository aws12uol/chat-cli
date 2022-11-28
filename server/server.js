const port = 3000;
const io = require("socket.io")(port);

console.log("Server is listening on port: %d", port);

io.of("/").on("connect", (socket) => {
    console.log("\nA client connected");

    socket.on("broadcast", (data) => {
        console.log("\n%s", data);
        socket.broadcast.emit("broadcast", {sender: data.sender, msgID: data.msgID});
    });

    socket.on("join", (data) => {
        console.log("\n%s", data);
        console.log("Name: ", data.sender, ", ID: ", socket.id);
        console.log("Number of clients: %d", io.of('/').server.engine.clientsCount);
        socket.nickname = data.sender;
        socket.broadcast.emit("join", data);
    });
    
    socket.on("disconnect", (reason) => {
        console.log("\nA client disconnected: %s", reason);
        console.log("Number of clients: %d", io.of('/').server.engine.clientsCount);
    });

    socket.on("quit", (data) => {
        console.log("\n%s", data);
        socket.broadcast.emit("quit", data);
        socket.disconnect(true);
    });
});

