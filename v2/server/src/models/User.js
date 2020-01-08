const mongoose = require("mongoose")

const UserModel = mongoose.model("user", mongoose.Schema({
	email:{type:String, required:true},
	password:{type:String, required:true}
}))

module.exports = UserModel