var User = require('../models/userSchema.js');

module.exports = {
    Create: function(req, res, next) {
        var newUser = new User(req.body);

        newUser.save(function(err, response) {
            if (err) {
                res.status(500 + 'you stink').json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },
    getCurrentUser: function(req, res, next){
      User.findOne({"_id":req.user._id}).populate("friends").exec(function(err, response) {
          if (err) {
              res.status(500).json(err);
          } else {
              res.status(200).json(response);
          }
      });
    },
//(req.user.populate("friends"))
    Read: function(req, res, next) {
        User.find(req.query).exec(function(err, response) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    ReadId: function(req, res, next) {
        User.findById(req.params.id).exec(function(err, response) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    Update: function(req, res, next) {
      console.log(req.query);
      console.log(req.body);
        User.findOneAndUpdate(req.query, req.body, function(err, response) {//finds first param, updates second
          console.log(response);
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(response);
        });
    },
    Delete: function(req, res, next) {
        console.log(req.query);
        User.find(req.query).exec(function(err, response) {
            console.log(response);
            if (err) {
                res.status(500).json(err);
            }
            response[0].remove();
        });
    },
    // getFriends: function(req, res, next){
    //   User.findById(req.user._id).populate({path:"friends", select: "username"})
    //   .exec(function(err, response){
    //     if (err) {
    //         res.status(500).json(err);
    //     } else {
    //
    //         res.status(200).json(response);
    //     }
    //   });
    // },
    addFriend: function(req, res, next){
      console.log(req.body);
      User.findByIdAndUpdate(req.user._id, {$push:{"friends":req.body._id}}, function(err, response){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(response);
        }
      });
    }


    // register: function(req, res, next){
    //   User.create(req.body, function(err, result){
    //     if(err){
    //       return res.status(500).send(err);
    //     }
    //     newser = result.toObject();
    //     newUser.password = null;
    //     res.status(200).json(newUSer);
    //   });
    // },
    // me: function(req, res, next){
    //   if(!req.user){
    //     return res.status(401).send('The user you entered is not defined');
    //   }
    //   req.user.password = null;
    //   return res.status(200).json(req.user);
    // },
    //
};
