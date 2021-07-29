var socket = io("http://localhost:2000");

var messages = document.getElementById("messages");
var form = document.getElementById("chat-form");
var input = document.getElementById("chat-input");
var typing = document.getElementById("typing");
let firstMessage = true;
let id = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    if (firstMessage) {
      id = input.value;
      firstMessage = false;
    }
    socket.emit("join-room", id);
    socket.emit("send-message", input.value, id);
    input.value = "";
  }
});

input.onchange = () => {
  socket.emit("client-typing");
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
    div.appendChild(item);
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
