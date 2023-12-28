const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

var mensajes = [];
var statusbtnsync = "btn-sync-false";

app.use(express.static("public"));

// app.get("/", (req, res) => {
// 	res.send("Página principal");
// });

// Sockets ********************************************************
io.on("connection", (socket) => {
	// console.log("conexión establecida");
	socket.on("client-message", (data) => {
		console.log(data);
		mensajes.push(data);
		if (data == "btn-sync-pressed") {
			btnsyncpressed();
		}
		if (data == "btn-clear-pressed") {
			btnclearpressed();
		}
		if (data == "btn-aux-pressed") {
			btnauxpressed();
		}

		// socket.emit("messages", mensajes); //Envia a un solo cliente
	});
	socket.on("status", (socket) => {
		io.sockets.emit("status", statusbtnsync);
	});
});
// Funciones *******************************************************
function btnsyncpressed() {
	io.sockets.emit("messages", mensajes);
	statusbtnsync = "btn-sync-true";
	//Proceso de trabajo
	statusbtnsync = "btn-sync-false";
	io.sockets.emit("status", statusbtnsync);
}
function btnclearpressed() {
	mensajes = [];
	io.sockets.emit("messages", mensajes);
}
function btnauxpressed() {
	io.sockets.emit("messages", mensajes);
	contador();
}

server.listen(8080, () => {
	console.log("server on port 8080");
});

async function contador() {
	console.log("Estoy en la función contador");
	for (let i = 0; i <= 10; i++) {
		await sleep(1000);
		mensajes.push(i);
		io.sockets.emit("messages", mensajes);
	}
}

var sleep = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
