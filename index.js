const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);

});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

//we use a set to store users, sets objects are for unique values of any type
const activeUsers = new Set();

// connecting
io.on("connection", function (socket) {
  console.log("Socket Connection made");

// adding new user to the active users 
  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    //... is the the spread operator, adds to the set while retaining what was in there already
    io.emit("new user", [...activeUsers]);
    console.log(socket.userId + " joined the chat");
  });

// when user disconnects 
  socket.on("disconnect", function () {
      activeUsers.delete(socket.userId);
      io.emit("user disconnected", socket.userId);
      console.log(socket.userId + " left the chat");
    });

// sending message 
    socket.on("chat message", function (data) {
      io.emit("chat message", data);
  });

// getting typing notification from server, 
  socket.on("typing", function(data){ //the data is the username
    socket.broadcast.emit("typing", data); // sends to all clients except for client that is typing
  });

});