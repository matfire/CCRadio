const mongoose = require("mongoose")
const cors = require('cors')
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const http = require("http").createServer(app)
const morgan = require("morgan")
const nodeshout = require('nodeshout')

const redis = require("redis")

const redisClient = redis.createClient({host:"redis", port:6379})

redisClient.on("connect", () => {
	console.log("redis server connected")
})
nodeshout.init()
console.log("nodeshout " + nodeshout.getVersion() + " initialized")
mongoose.connect("mongodb://mongo:27017/webradio", {useUnifiedTopology:true, useNewUrlParser:true})
const db = mongoose.connection
db.once("open", () => {
	console.log("database connected")
}) 

db.on("error", (err) => {
	console.log(err)
})

const authRouter = require("./src/routes/auth")
const radioRouter = require("./src/routes/radio")
const playlistRouter = require("./src/routes/playlist")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(morgan("dev"))
app.use("/auth", authRouter)
app.use("/radio", radioRouter)
app.use("/playlist", playlistRouter)

// app.post("/radio/playlist", isAuthenticated, async(req, res) => {
// 	let {name, songs, radioId} = req.body
// 	let playlist = await playlistModel.create({name, songs, author:req.user._id})
// 	let radio = await RadioModel.findById(radioId)
// 	radio.currentPlaylist = playlist
// 	await radio.save()
// 	redisClient.get("radios", (radios) => {
// 		redisClient.set("radios", radios += radio.name)
// 		res.json({playlist})
// 	})
// })

app.get("/", (req, res) => {
	res.send("🗡 this is not a server")
})

http.listen(4000,() => {
	console.log("listening on port 4000")
})
