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
		mensajes = data;
		if (data == "btn-sync-pressed") {
			btnsyncpressed();
		}
		if (data == "btn-clear-pressed") {
			btnclearpressed();
		}
		if (data == "btn-aux-pressed") {
			btnauxpressed();
		}
	});
	socket.on("status", (socket) => {
		io.sockets.emit("status", statusbtnsync);
	});
});

// Funciones *******************************************************
async function btnsyncpressed() {
	// socket.emit("messages", mensajes); //Envia a un solo cliente
	io.sockets.emit("messages", mensajes);
	statusbtnsync = "btn-sync-true";
	io.sockets.emit("status", statusbtnsync);
	//Añadir la lógica de funcionamiento
	await contador(); //Lógica de prueba
	statusbtnsync = "btn-sync-false";
	io.sockets.emit("status", statusbtnsync);
}
function btnclearpressed() {}

function btnauxpressed() {}

async function contador() {
	console.log("Estoy en la función contador");
	for (let i = 0; i <= 10; i++) {
		await sleep(1000);
		io.sockets.emit("messages", i);
	}
}

var sleep = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Servidor a la escucha *********************************************
server.listen(8080, () => {
	console.log("server on port 8080");
});
