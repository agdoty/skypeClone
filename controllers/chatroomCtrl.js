var Chatroom = require('../models/chatRoomSchema.js');
var Message = require('../models/messageSchema.js');

module.exports = {
  //gets information for the Chatroom
  Read: function(req, res, next) {
      Chatroom.findById(req.params.id).populate({path:'messages', select:"_id text user", populate:{path:"user", select:"username email _id"}}).exec(function(err, response) {
          if (err) {
              res.status(500).json(err);
          } else {
              res.status(200).json(response);
          }
      });
  },
  Create: function(req, res, next) {
      var newMessage = new Message(req.body);

      newMessage.save(function(err, response) {
          if (err) {
              res.status(500 + 'you stink').json(err);
          } else {
            //pull chatroom and push to nessages array response._id
            Chatroom.findByIdAndUpdate(req.params.id, {$push:{"messages": response._id}}, function(err, response){
              if (err) {
                  res.status(500).json(err);
              } else {
                  res.status(200).json(response);
              }
            });
          }
      });
  },
  CreateRoom: function(req, res, next) {
    var newRoom = new Chatroom(req.body);
    newRoom.usersInchat.push(req.user._id);
    newRoom.save(function(err, response){
      if (err) {
          res.status(500).json(err);
      } else {
          res.status(200).json(response);
      }
    });
  },
  addToChat: function(req, res, next) {
    console.log(req.body);
    Chatroom.findByIdAndUpdate(req.body.Chatroom, {$addToSet:{"usersInchat": req.body.user}}, function(err, response){
      if (err) {
          res.status(500).json(err);
      }
      res.status(200).json(response);
    });
  },

  addMsg: function(req, res, next) {
    console.log(req.body);
    var newMsg = new Message(req.body);
    newMsg.user = req.user._id;
    newMsg.save(function(err, response){
      if (err) {
          res.status(500).json(err);
      }
      else{
        Chatroom.findByIdAndUpdate(req.body.Chatroom, {$push:{"messages":response._id}}, function(err, response){
          if (err) {
              res.status(500).json(err);
          }
          else{
          res.status(200).json(response);
        }
      });
      }
    });
  },
  getChatRooms: function(req, res, next){
    Chatroom.findById(req.params.id).populate({path:"messages", populate:{path: "user"}}).exec(function(err, response){
      if(err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(response);
      }
    });
  },
  chatUserIn: function(req, res, next){
    Chatroom.find({usersInchat:{$in: [req.user._id]}}).exec(function(err, response){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.status(200).json(response);
      }
    });
  }
  // chatDelete: function(req, res, next) {
  //   Chatroom.findById()
  // }
};
