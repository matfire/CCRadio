const router = require("express").Router()
const {isAuthenticated} = require("../middleware")
const RadioModel = require("../models/Radio")
const PlaylistModel = require("../models/Playlist")
const nodeshout = require('nodeshout')
const FileReadStream = nodeshout.FileReadStream
const ShoutStream = nodeshout.ShoutStream
const fs = require('fs')

const createShout = () => {
	var shout = nodeshout.create()
	shout.setHost("icecast")
	shout.setPort(8000)
	shout.setPassword("aaa")
	shout.setFormat(1)
	shout.setAudioInfo('bitrate', '160');
	shout.setAudioInfo('samplerate', '44100');
	shout.setAudioInfo('channels', '2');
	return shout
}

// router.get("/:id", async(req, res) => {
// 	let playlist = await PlaylistModel.findById(req.params.id)
// 	res.json({playlist})
// })

// router.post("/", isAuthenticated, async(req, res) => {
// 	let playlist = PlaylistModel.create({
// 		...req.body,
// 		name: req.body.name + "_" + req.user._id,
// 		author: req._id
// 	})
// 	res.json({playlist})
// })

router.post("/", isAuthenticated, async(req, res) => {
	let playlist = await PlaylistModel.create({
		songs: req.body.songs,
		name: req.body.name + "_" + req.user._id,
		author: req._id
	})
	let radio = await RadioModel.findById(req.body.radioId)
	radio.currentPlaylist = playlist._id
	await radio.save()
	res.json({playlist})
})

router.get("/play/:id", isAuthenticated, async(req, res) => {
	let playlist = await PlaylistModel.findById(req.params.id)
	let shout = createShout()
	let index = 0
	shout.setMount(`${req.query.radio}`)
	shout.open()
	const metadata = nodeshout.createMetadata();
		metadata.add('song', `${playlist.songs[index]}`);
		// Apply metadata to shout
		shout.setMetadata(metadata);
		var fileStream = new FileReadStream(__dirname + `/../../music/${playlist.songs[index]}.mp3`, 65536)
		var shoutStream = fileStream.pipe(new ShoutStream(shout))
		shoutStream.on("finish", () => {
			console.log("[+] Song finished")
			index += 1
			if (index >= playlist.songs.length)
				index = 0
			metadata.add('song', `${playlist.songs[index]}`);
			shout.setMetadata(metadata);
			fileStream = new FileReadStream(__dirname + `/../../music/${playlist.songs[index]}.mp3`, 65536)
			shoutStream = fileStream.pipe(new ShoutStream(shout))
		})
	// Set currently playing song.
	res.send("ok")
})

module.exports = router