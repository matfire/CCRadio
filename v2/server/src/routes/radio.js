const router = require("express").Router()
const {isAuthenticated} = require("../middleware")
const multer = require("multer")
const upload = multer({dest: __dirname + "/images"})
const fs = require("fs")

router.get("/:id", async(req, res) => {
	let radio = await RadioModel.findById(req.param("id")).populate("user").populate("currentPlaylist")
	res.json({radio: {...radio.toObject(), name:radio.name.split("_")[0]}})
})

router.get("/:id/play", async(req, res) => {

})

router.get("/songs", isAuthenticated,(req, res) => {
	let files = fs.readdirSync(path.join(__dirname, "music"))
	files = files.map((f) => f.split(".")[0])
	res.json({files})
})

router.post("/", isAuthenticated, upload.single("logo"), async(req, res) => {
	console.log(req.file)
	console.log(req.files)
	console.log(req.body)
	let model = await RadioModel.create({...req.body, user:req.user._id, name:req.body.radioName + "_" + req.user._id, logo:"/images/" + req.file.filename})
	res.json({radio:model})
})

module.exports = router