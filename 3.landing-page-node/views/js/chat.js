var socket = io("http://localhost:2200");
var messages = document.getElementById("messages");
var form = document.getElementById("chat-form");
var input = document.getElementById("chat-input");
var typing = document.getElementById("typing");

let id = "";
let conversation = [];

/*
 This function creates a message on the chat.
*/
const createMessage = (tmpMessage) => {
  //If message send to me.
  if (!tmpMessage.isCrmSender) {
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.margin = "10px";

    var item = document.createElement("div");
    item.textContent = tmpMessage.message;
    item.style.color = "white";
    item.style.backgroundColor = "#002c9b";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";

    var date = document.createElement("div");
    var dateTmp = new Date(tmpMessage.date);
    date.textContent =
      tmpMessage.date.split(" ")[1] +
      " " +
      tmpMessage.date.split(" ")[2] +
      " " +
      dateTmp.getHours() +
      ":" +
      dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "10px";
    date.style.marginRight = "10px";

    div.appendChild(item);
    div.appendChild(date);
    messages.appendChild(div);
    //If I send the message.
  } else {
    typing.style.display = "none";

    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.margin = "10px";

    var item = document.createElement("div");
    item.textContent = tmpMessage.message;
    item.style.color = "white";
    item.style.backgroundColor = "grey";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";

    var date = document.createElement("div");
    var dateTmp = new Date(tmpMessage.date);
    date.textContent =
      tmpMessage.date.split(" ")[1] +
      " " +
      tmpMessage.date.split(" ")[2] +
      " " +
      dateTmp.getHours() +
      ":" +
      dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "10px";
    date.style.marginRight = "10px";

    div.appendChild(date);
    div.appendChild(item);
    messages.appendChild(div);
  }
};

const onRender = () => {
  const room = window.localStorage.getItem("room");
  axios
    .post("http://localhost:9090/chat/clientMessages", {
      email: room,
    })
    .then(function (response) {
      conversation = response.data.messages;
      for (message in conversation) {
        tmpMessage = conversation[message];
        createMessage(tmpMessage);
      }
    })
    .catch(function () {});
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    if (!window.localStorage.getItem("room")) {
      window.localStorage.setItem("room", input.value);
    }
    id = window.localStorage.getItem("room");
    socket.emit("join-room", id);
    socket.emit("send-message", input.value, id);
    input.value = "";
  }
});

input.onchange = () => {
  socket.emit("client-typing", id);
};

let messagesArr = ["Please write your mail to start..."];

var div = document.createElement("div");
div.style.display = "flex";
div.style.justifyContent = "flex-end";
div.style.margin = "10px";
var item = document.createElement("div");
item.textContent = messagesArr[0];
item.style.color = "white";
item.style.backgroundColor = "grey";
item.style.padding = "10px";
item.style.borderRadius = "10px";
div.appendChild(item);
messages.appendChild(div);

socket.on("receive-message", (msg) => {
  console.log(msg);
  //If message send to me.
  if (!msg.isCrmSender) {
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.margin = "10px";
    var item = document.createElement("div");
    item.textContent = msg.message;
    item.style.color = "white";
    item.style.backgroundColor = "#002c9b";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";
    var date = document.createElement("div");
    // var dateTmp = Date.now();
    date.textContent = Date.now();
    // dateTmp.split(" ")[1] +
    //   " " +
    //   dateTmp.split(" ")[2] +
    //   " " +
    //   dateTmp.getHours() +
    //   ":" +
    //   dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "10px";
    date.style.marginRight = "10px";

    div.appendChild(item);
    div.appendChild(date);
    messages.appendChild(div);
    //If I send the message.
  } else {
    typing.style.display = "none";
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.margin = "10px";
    var item = document.createElement("div");
    item.textContent = msg.message;
    item.style.color = "white";
    item.style.backgroundColor = "grey";
    item.style.padding = "10px";
    item.style.borderRadius = "10px";
    var date = document.createElement("div");
    // var dateTmp = Date.now();
    date.textContent = Date.now();
    // msg.date.split(" ")[1] +
    // " " +
    // msg.date.split(" ")[2] +
    // " " +
    // dateTmp.getHours() +
    // ":" +
    // dateTmp.getMinutes();
    date.style.color = "grey";
    date.style.fontSize = "10px";
    date.style.marginLeft = "10px";
    date.style.marginRight = "10px";

    div.appendChild(date);
    div.appendChild(item);
    messages.appendChild(div);
  }
});

socket.on("crm-typing", () => {
  typing.style.display = "block";
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("openBtn").style.display = "none";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("openBtn").style.display = "block";
}
