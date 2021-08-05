const axios = require("axios");
const app = require("express")();
const io = require("socket.io")(2200, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:8003",
      "http://homemade.delivery.com:8003",
    ],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  //From client.
  socket.on("send-message", (message, socketId) => {
    axios
      .get(`http://localhost:9090/chat?socketId=${socketId}`)
      .then((res) => {
        if (res.data) {
          axios.put("http://localhost:9090/chat", {
            socketId: socketId,
            message: {
              message,
              date: new Date(Date.now()).toUTCString(),
              isCrmSender: false,
            },
          });
        } else {
          axios.post("http://localhost:9090/chat", {
            socketId: socketId,
            message: {
              message,
              date: new Date(Date.now()).toUTCString(),
              isCrmSender: false,
            },
          });
        }
      })
      .catch((error) => {});

    io.to("crm").to(socketId).emit("receive-message", {
      message,
      senderId: socketId,
      isCrmSender: false,
    });
  });

  //From crm.
  socket.on("send-message-crm", (message) => {
    axios
      .get(`http://localhost:9090/chat?socketId=${message.receiverId}`)
      .then((res) => {
        if (res.data) {
          axios.put("http://localhost:9090/chat", {
            socketId: message.receiverId,
            message: {
              message: message.message,
              date: new Date(Date.now()).toUTCString(),
              isCrmSender: true,
            },
          });
        } else {
          axios.post("http://localhost:9090/chat", {
            socketId: message.receiverId,
            message: {
              message: message.message,
              date: new Date(Date.now()).toUTCString(),
              isCrmSender: true,
            },
          });
        }
      });
    io.to("crm").to(message.receiverId).emit("receive-message", {
      message: message.message,
      receiverId: message.receiverId,
      isCrmSender: true,
    });
  });

  //client is typing.
  socket.on("client-typing", (id, type) => {
    io.to("crm").emit("client-typing", id, type);
  });

  //crm is typing.
  socket.on("crm-typing", (receiverId, type) => {
    io.to(receiverId).emit("crm-typing", type);
  });
});
