angular.module('skypeClone').service('connectSvc', function($http) {
  this.getMessages = function(chatid){
    return $http ({
      method:"GET",
      url: '/api/messages/' + chatid
    }).then(function(response){
      return response.data;
    });
  };
  this.postMessage = function(message){
    return $http({
      method: "POST",
      url: '/api/message/',
      data: message
    }).then(function(response){
      return response.data;
    });
  };
  this.newRoom = function(newroom){
    return $http({
      method: "POST",
      url: '/api/chatroom/',
      data: newroom
    }).then(function(response){
      return response.data;
    });
  };
  this.getCurrentUser = function(){
    return $http({
      method:"GET",
      url:'/api/current/user'
    }).then(function(response){
      return response.data;
    });
  };
this.addToChat = function(fid, chatid){
  return $http({
    method: "PUT",
    url:"/api/chatroom/add",
    data: {
      Chatroom: chatid,
      user: fid
    }
  }).then(function(response){
    return response.data;
  });
};
this.addMsg = function(newMsg, chatid){
  return $http ({
    method: "PUT",
    url:"/api/chatroom/msg",
    data: {
      Chatroom: chatid,
      text: newMsg
    }
    }).then(function(response){
      return response.data;
  });
};
this.getChatRooms = function(chatid){
  return $http({
    method: "GET",
    url: "/api/chatroom/join/" + chatid
  }).then(function(response){
    return response.data;
  });
};
this.chatUserIn = function(){
  return $http({
    method: "GET",
    url: "/api/chatroom/pastchats"
  }).then(function(response){
    return response.data;
  });
};
  // this.getFriends = function(){
  //   return $http({
  //     method:"GET",
  //     url:'/api/user/friends'
  //   }).then(function(response){
  //     return response.data;
  //   });
  // }
});
