const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const adduser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

io.on("connection", (socket) => {
  console.log("A user Connected");
  socket.on("addUser", userId=>{
  
  })
  // io.emit("welcome", "hello this is socket server");
});
