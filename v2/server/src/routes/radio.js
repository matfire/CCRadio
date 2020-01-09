const router = require("express").Router()
const {isAuthenticated} = require("../middleware")
const multer = require("multer")
const upload = multer({dest: __dirname + "/images"})
const fs = require("fs")
const RadioModel = require("../models/Radio")
const path = require("path")

router.post("/:id/play", async(req, res) => {
	
})

router.get("/", async(req, res) => {
	let radios = await RadioModel.find()
	res.json({radios})
})

router.get("/songs", isAuthenticated,(req, res) => {
	let files = fs.readdirSync(path.join(__dirname, "..", "..", "music"))
	files = files.map((f) => f.split(".")[0])
	res.json({files})
})

router.get("/:id", async(req, res) => {
	let radio = await RadioModel.findById(req.param("id")).populate("user")
	if (radio.currentPlaylist) {
		radio = await radio.populate("currentPlaylist").execPopulate()
		console.log(radio.toObject())
	}
	res.json({radio: {...radio.toObject(), name:radio.name.split("_")[0]}})
})

router.post("/", isAuthenticated, upload.single("logo"), async(req, res) => {
	let model = await RadioModel.create({...req.body, user:req.user._id, name:req.body.radioName + "_" + req.user._id, logo:"/images/" + req.file.filename})
	res.json({radio:model})
})

module.exports = router 