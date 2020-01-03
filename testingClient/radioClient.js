const io = require("socket.io-client")

const socket = io("http://localhost:4000")

socket.emit("change radio", {radioName:"name"})

socket.on("radio selected", (data) => {
	console.log(data)
	socket.emit("set radio playlist", {
	"radioName":"name",
	"songs": ["http://www.youtube.com/watch?v=U9OQAySv184"]
	})
})
