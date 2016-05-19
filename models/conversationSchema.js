var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
    // user_id : ObjectId,
    // users : Array,
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
});

module.exports = conversationSchema;
