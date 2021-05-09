var mongoose = require("mongoose");
var  passportMongoose = require("passport-local-mongoose");

UserSchema = new mongoose.Schema({
	username:String,
	password:String
})

UserSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", UserSchema);