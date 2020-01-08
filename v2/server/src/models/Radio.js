const mongoose = require("mongoose")

const RadioModel = mongoose.model("radio", mongoose.Schema({
	name:{type:String, required:true, unique:true},
	slogan:{type:String, required:true},
	logo:{type:String},
	mainColor:{type:String},
	secondaryColor:{type:String},
	user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
	currentPlaylist: {type:mongoose.Schema.Types.ObjectId, ref:"playlist"}
}))

module.exports = RadioModel