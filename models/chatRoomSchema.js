// var mongoose = require("mongoose");
//
// var chatRoomSchema = new mongoose.Schema({
//
//   message: ({
//     room : {type : String, index: true},
//     text: String,
//     username: {type: String, required: true},
//     to : ObjectId,
//     user_id: String,
//     avatar: String,
//     created: {type: Date, default: Date.now},
//     modified: {type: Date, default: Date.now}
//   }),
//   room: ({
//     name: {type: String, index: {unique: true}},
//     user_id:ObjectId,
//     restricted: String,
//     created: {type: Date, default: Date.now},
//     modified: {type: Date, default: Date.now}
//   }),
//   conversation: ({
//     user_id : ObjectId,
//     users : Array,
//     created: {type: Date, default: Date.now},
//     modified: {type: Date, default: Date.now}
//   }),
//
// });
//
// module.exports = mongoose.model("Chat", chatRoomSchema);
