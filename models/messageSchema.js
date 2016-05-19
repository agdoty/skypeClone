var mongoose = require("mongoose");
var chatroomSchema = require('./chatRoomSchema');
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({

  text: {type: String},
  user: {type: Schema.Types.ObjectId, ref: "User"},
  created: {type: Date, default: Date.now}


});

module.exports = mongoose.model("Message", messageSchema);
