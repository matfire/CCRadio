const mongoose = require("mongoose")

const playlistModel = mongoose.model("playlist", mongoose.Schema({
	name: String,
	songs: [{type:String}],
	author: {type:mongoose.Schema.Types.ObjectId, ref:"user"}
}))

module.exports = playlistModel