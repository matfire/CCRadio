const mongoose = require("mongoose")
const cors = require('cors')
const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

const app = express()
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




app.listen(4000,() => {
	console.log("listening on port 4000")
})