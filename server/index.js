const mongoose = require("mongoose")
const cors = require('cors')
const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const app = express()
const fs = require("fs")
var http = require("http").createServer(app)
var io = require("socket.io")(http)
const m3u8stream = require('m3u8stream');

const parseTime   = require('m3u8stream/dist/parse-time');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");


var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/usr/bin/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": path.join(__dirname, "music"),    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});


mongoose.connect("mongodb://matteo:matteo99@ds113936.mlab.com:13936/webradio", {useUnifiedTopology:true, useNewUrlParser:true})
const db = mongoose.connection
db.once("open", () => {
	console.log("database connected")
})

db.on("error", (err) => {
	console.log(err)
})


const UserModel = mongoose.model("user", mongoose.Schema({
	email:{type:String, required:true},
	password:{type:String, required:true}
}))

const RadioModel = mongoose.model("radio", mongoose.Schema({
	name:{type:String, required:true},
	slogan:{type:String, required:true},
	logo:{type:String, required:true},
	mainColor:{type:String},
	secondaryColor:{type:String},
	user:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
}))

app.use(cors())
app.use(bodyParser.json())


app.post("/login", (req, res) => {
	UserModel.findOne({email:req.body.email}).then(user => {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			let token = jwt.sign(JSON.stringify(user), "lifebeforedeath")
			res.json({token})
		} else {
			res.status(401).json({message:"wrong credentials"})
		}
	}).catch(() => {
		res.status(401).json({message:"wrong credentials"})
	})
})

app.post("/register", (req, res) => {
	let {email, password} = req.body
	UserModel.findOne({email}).then((user) => {
		if (user)
			res.status(401).json({message:"invalid credentials"})
		else {
			UserModel.create({email, password:bcrypt.hashSync(password, 12)}).then((user) => {
				res.json({token:jwt.sign(JSON.stringify(user), "lifebeforedeath")})
			}).catch(() => {
				res.status(500).json({message:"something went wrong; please try again"})
			})
		}
	}).catch(() => {
		res.status(500).json({message:"something went wrong; please try again"})
	})
})

app.post("/radio", async(req, res) => {
	let model = await RadioModel.create({...req.body, user:JSON.parse(jwt.decode(req.header("authorization")))._id})
	res.json({radio:model})
})

/**
 * @typedef {Object} radioSongsData
 * @property {String} radioName
 * @property {String[]} songs
 */

/**
 * @description verifies radio songs and removes unnecessary data from the url
 * @param {radioSongsData} data
 * @returns {String[]} parsedSongs
 */
const parseRadioSongs = (data) => {
	const songs = data.songs
	const radioName = data.radioName
	const parsedSongs = songs.map((s) => {
		let splitted = s.split("v=")
		return splitted.pop()
	})
	console.log("[?] here are the ids of songs to add: " + parsedSongs)
	return parsedSongs
}

/**
 * @description processes songs, i.e. it downloads them and stores them
 * @param {String[]} songs 
 * @param {SocketIO.Socket} socket
 * @param {String} radioName
 * @returns {String} path of file containing 
 */
const processRadioSongs = async(songs, radioName) => {
	const radioSongLocation = path.join(__dirname, "music", radioName + ".json")
	let songsFinished = 0
	const radioSongs = []
	songs.forEach((s) => {
		YD.download(s)
		YD.on("finished", (err, data) => {
			if (!err) {
				radioSongs.push({
					file: data.file,
					title: data.title,
					id: data.videoId
				})
				songsFinished += 1
				if (songsFinished >= songs.length) {
					fs.writeFileSync(radioSongLocation, JSON.stringify(radioSongs))
					return radioSongLocation
				}
			}
		})
	})
}


io.on("connection", (socket) => {
	console.log("[+] new client connected")
	socket.on("change radio", ({radioName}) => {
		let currentRooms = socket.rooms
		console.log("[?] Socket is currently connected to rooms: " + currentRooms)
		socket.join(radioName)
		socket.emit("radio selected", {radioName})
	})

	socket.on("set radio playlist", (data) => {
		let songs = parseRadioSongs(data)
		processRadioSongs(songs, socket)
		socket.emit("radio songs set", data.radioName)
	})
})





http.listen(4000,() => {
	console.log("listening on port 4000")
})