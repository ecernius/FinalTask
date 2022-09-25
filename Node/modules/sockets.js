const socket = require("socket.io");

let chats = [];
const users = [];
const seats = [
  {
    seat: 1,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 2,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 3,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 4,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 5,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 6,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 7,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 8,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 9,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 10,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 11,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 12,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 13,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 14,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 15,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 16,
    reserved: "",
    price: 7.99,
  },
  {
    seat: 17,
    reserved: "",
    price: 7.99,
  },
];

const helpers = {
  getUser: (socketId) => {
    const result = users.find((x) => x.id === socketId);
    return result.user;
  },
  emitDaysToOnlineUsers: (io) => {
    users.map((x) => {
      io.to(x.id).emit("movie", movie);
    });
  },
};

module.exports = (http) => {
  const io = socket(http, { cors: { origin: "http://localhost:3000" } });

  io.on("connect", (socket) => {
    socket.on("login", (user) => {
      console.log(user);
      const newUser = {
        user,
        id: socket.id,
      };
      users.push(newUser);

      socket.emit("movie", movie);
      socket.emit("seats", seats);
    });
    socket.on("message", (data) => {
      chats.messages.push(msg);

      io.to(data.id).emit("chat", chats);
    });
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data.content);
    });

    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED");
    });
  });
};
