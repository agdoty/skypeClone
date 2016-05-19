var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({

    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    password: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    email: {
        type: String,
        index: {
            unique: true
        },
        trim: true
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }]
    // status : {type: String, index : true},
    // visits : Number,
});
//set up verify password method
//gen salt sync
User.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});
//method verify's the password the user enters from login screen
User.methods.verifyPassword = function(reqBodyPassword) {
    return bcrypt.compareSync(reqBodyPassword, this.password);
};

module.exports = mongoose.model("User", User);
