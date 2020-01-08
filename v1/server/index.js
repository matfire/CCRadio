const mongoose = require("mongoose")
const cors = require('cors')
const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const app = express()
const fs = require("fs")
const http = require("http").createServer(app)
const multer = require("multer")
const morgan = require("morgan")
const upload = multer({dest: __dirname + "/images"})

const redis = require("redis")

const redisClient = redis.createClient({host:"redis", port:6379})

redisClient.on("connect", () => {
	console.log("redis server connected")
})


mongoose.connect("mongodb://mongo:27017/webradio", {useUnifiedTopology:true, useNewUrlParser:true})
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

const playlistModel = mongoose.model("playlist", mongoose.Schema({
	name: String,
	songs: [{type:String}],
	author: {type:mongoose.Schema.Types.ObjectId, ref:"user"}
}))

const RadioModel = mongoose.model("radio", mongoose.Schema({
	name:{type:String, required:true, unique:true},
	slogan:{type:String, required:true},
	logo:{type:String},
	mainColor:{type:String},
	secondaryColor:{type:String},
	user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
	currentPlaylist: {type:mongoose.Schema.Types.ObjectId, ref:"playlist"}
}))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(morgan("dev"))
const isAuthenticated = (req, res, next) => {
	let {authorization} = req.headers
	if (authorization) {
		if (jwt.verify(authorization, "lifebeforedeath")) {
			let user = jwt.decode(authorization)
			req.user = user
			next()
		} else {
			res.status(401).json({message:"invalid token"})
		}
	} else {
		res.status(401).json({message:"invalid token"})
	}
}

app.post("/login", (req, res) => {
	UserModel.findOne({email:req.body.email}).then(user => {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			let token = jwt.sign(JSON.stringify(user), "lifebeforedeath")
			res.json({token, user})
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
				res.json({token:jwt.sign(JSON.stringify(user), "lifebeforedeath"), user})
			}).catch(() => {
				res.status(500).json({message:"something went wrong; please try again"})
			})
		}
	}).catch(() => {
		res.status(500).json({message:"something went wrong; please try again"})
	})
})

app.post("/radio", isAuthenticated, upload.single("logo"), async(req, res) => {
	console.log(req.file)
	console.log(req.files)
	console.log(req.body)
	let model = await RadioModel.create({...req.body, user:req.user._id, name:req.body.radioName + "_" + req.user._id, logo:"/images/" + req.file.filename})
	res.json({radio:model})
})

app.post("/radio/playlist", isAuthenticated, async(req, res) => {
	let {name, songs, radioId} = req.body
	let playlist = await playlistModel.create({name, songs, author:req.user._id})
	let radio = await RadioModel.findById(radioId)
	radio.currentPlaylist = playlist
	await radio.save()
	redisClient.get("radios", (radios) => {
		redisClient.set("radios", radios += radio.name)
		res.json({playlist})
	})
})

app.get("/radio/songs", isAuthenticated,(req, res) => {
	let files = fs.readdirSync(path.join(__dirname, "music"))
	files = files.map((f) => f.split(".")[0])
	res.json({files})
})

app.get("/radio/:id", async(req, res) => {
	let radio = await RadioModel.findById(req.param("id")).populate("user").populate("currentPlaylist")
	res.json({radio: {...radio.toObject(), name:radio.name.split("_")[0]}})
})

app.get("/radio/current", async(req, res) => {
	try {
		let radios = await RadioModel.find()
		res.json({radios})
	} catch {
		res.json({radios: []})
	}
})

app.get("/", (req, res) => {
	res.send("🗡 this is not a server")
})

app.get("/radio/:name/playing", async(req, res) => {
	let radio = await RadioModel.findById(req.params.name).populate("currentPlaylist")
	if (radio.currentPlaylist) {
	let songs = radio.toObject().currentPlaylist.songs
	redisClient.get(req.param("name"), (err, currentSong) => {
		if (err) {
			res.json({songs})
		} else {
			res.json({songs: songs.slice(songs.indexOf(currentSong))})
		}
	})
	} else {
		res.json([])
	}
})

app.get("/radio/play/:name", (req, res) => {
	let file = fs.createReadStream(path.join(__dirname, "music", req.param("name") + ".mp3"))
	let stat = fs.statSync(path.join(__dirname, "music", req.param("name") + ".mp3"))
	let radio = req.query.radio
	res.header({
		'Content-Type':"audio/mpeg",
		'Content-length': stat.size
	})
//	redisClient.set(radio, req.param("name"))
	file.pipe(res)
	
})

http.listen(4000,() => {
	console.log("listening on port 4000")
})
