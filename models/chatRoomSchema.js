var mongoose = require("mongoose");
var User = require('./userSchema');
var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({

    name: {type: String},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    usersInchat:[{type: Schema.Types.ObjectId, ref:"User"}],

    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]

});

module.exports = mongoose.model("Chat", chatRoomSchema);
