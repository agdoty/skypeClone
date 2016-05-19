var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var mongoose = require("mongoose");
var passport = require('passport');

// var config = require('./config');
var userCtrl = require('./controllers/userCtrl.js');
var chatroomCtrl = require('./controllers/chatroomCtrl.js');
// var passportJs = require('./passport.js');
var local = require('passport-local');

var User = require('./models/userSchema.js');
var Chatroom = require('./models/chatRoomSchema.js');

//policy
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

var app = express();


// require('./passport.js')(passport);


app.use(session({
  secret: process.env.SESSION_SECRET || "hfdkjsl;ajsdk;lakjsadf",
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());  ///////
app.use(bodyParser.json());  /////

app.use(express.static(__dirname+'/public')); //how to serve up front-end files from the server

passport.use(new local.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
   process.nextTick(function(){
  console.log("starting");
  User.findOne({email: email})
  .exec(function(err, user){
    console.log(user);
    if(err){
      done(err);
    }
    if(!user){
       return done(null, false);
     }
    if(user.verifyPassword(password)){
      return done(null, user);
    }
    return done(null, false);
  });
});
}));



//users
app.get('/api/user', userCtrl.Read);
app.get('/api/user/:id', userCtrl.ReadId); //for login atm
app.post('/api/user', userCtrl.Create);
app.put('/api/user', userCtrl.Update);//took out /:id
app.delete('/api/user', userCtrl.Delete);
app.get('/api/current/user', userCtrl.getCurrentUser);
// app.get('api/user/friends', userCtrl.getFriends);
app.put('/api/user/friend', userCtrl.addFriend);
//authentication / redirect0-
////CHATROOM
app.get('/api/messages/:id', chatroomCtrl.Read);
app.post('/api/message/:id', chatroomCtrl.Create);
app.post('/api/chatroom', chatroomCtrl.CreateRoom);
app.put('/api/chatroom/add', chatroomCtrl.addToChat);
app.put('/api/chatroom/msg', chatroomCtrl.addMsg);
app.get('/api/chatroom/join/:id', chatroomCtrl.getChatRooms);
app.get('/api/chatroom/pastchats', chatroomCtrl.chatUserIn);
////AUTHENTICATION




app.post('/login',
function(req, res, next){
  console.log(req.body);
  next();
},                  //////////////////////////
   passport.authenticate('local', {
    failureRedirect: false
  }), function(req, res){
    res.json({id:req.user.id, username: req.user.username});
  });

// app.post('/login', passport.authenticate('local'));

passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(_id, done){
  User.findById(_id, function(err, user){
    done(err, user);
  });
});

 app.get('/logout', function(req, res, next) {
   req.logout();
   return res.status(200).send('logged out');
 });

 var mongoURI = process.env.MONGO_URI;
 var port = process.env.PORT || 4000; ///////////////////////////

mongoose.connect('mongodb://localhost:27017/skypeClone');
mongoose.connection.once('open', function(){
    console.log('Connected to mongodb \n');
});


app.listen(port, function(){
    console.log("listening on port 4000");
});
