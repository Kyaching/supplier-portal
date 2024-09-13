const {Server} = require("socket.io");

let io;
const users = {};
const offlineMessages = {};
const initSocket = server => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", socket => {
    console.log("A user connected", socket.id);

    socket.on("register", async username => {
      if (username !== null) {
        if (users[username] && users[username !== socket.id]) {
          console.log(
            `User ${username} already registered with another socket ID`
          );
          return;
        }
        users[username] = socket.id;
        console.log(`User ${username} registered`);
        console.log("Users", users);
      }
      if (offlineMessages[username]) {
        offlineMessages[username].forEach(message => {
          io.to(socket.id).emit("offline-message", message);
          console.log(`Pending message delivered to ${username}`);
        });
        delete offlineMessages[username];
      }
    });

    socket.on("disconnect", () => {
      for (const [username, socketId] of Object.entries(users)) {
        if (socketId === socket.id) {
          console.log(`User ${username} disconnected`);
          delete users[username];
          break;
        }
      }
      console.log("User disconnected");
    });
  });
};

const getSocket = () => io;

module.exports = {initSocket, getSocket, users, offlineMessages};
