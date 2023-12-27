// setTimeout(() => {
// 	document.getElementById("title").innerHTML = "Pulsación";
// }, 3000);

// TODO: Hardcoded port?
// const API_WS_PORT = 8082;
// const urlBase = `${location.protocol}//${location.host}`;

// const socket = new WebSocket(`ws://${location.hostname}:${API_WS_PORT}`);

// socket.addEventListener("open", (event) => {
// 	socket.send("Hello Server!");
// });

// socket.addEventListener("message", (event) => {
// 	console.log(event.data);
// 	const element = document.createElement("div");
// 	element.appendChild(document.createTextNode(event.data));
// 	document.getElementById("console").appendChild(element);
// });

const socket = io.connect("http://localhost:8080", { forceNew: true });
consola = [];

window.onload = function () {
	socket.emit("status", "status");
};

socket.on("messages", (event) => {
	console.log(event);
	// consola.push(event);
	console.log("datos almacenados: " + consola);
	document.getElementById("console").innerHTML = event.join("<BR>");
});

socket.on("status", (event) => {
	// console.log("Enviado desde el servidor: " + event);
	if (event == "btn-sync-false") {
		document.getElementById("btn-sync").disabled = false;
	}
	if (event == "btn-sync-true") {
		document.getElementById("btn-sync").disabled = true;
	}
});

//--------------------------------------------------------------------------------------------------------------------

document.getElementById("btn-sync").addEventListener("click", () => {
	// console.log("botón sync presionado");
	document.getElementById("btn-sync").disabled = true;
	socket.emit("client-message", "btn-sync-pressed");
});

document.getElementById("btn-clear").addEventListener("click", () => {
	// console.log("botón clear presionado");
	document.getElementById("console").innerHTML = "";
	socket.emit("client-message", "btn-clear-pressed");
});

document.getElementById("btn-aux").addEventListener("click", () => {
	// console.log("botón aux presionado");
	socket.emit("client-message", "btn-aux-pressed");
});
