angular.module('skypeClone').controller('userHomeCtrl', function($scope, loginSvc, connectSvc, user, $state) {



  $scope.interval;

  $scope.getMessages = function(chatid){
    connectSvc.getMessages($scope.chatid).then(function(response){
    $scope.messages = response.messages;
    });
  };
  $scope.postMessage = function(message){
    connectSvc.postMessage(message).then(function(response){
      $scope.messageNew = response;
    });
  };
  $scope.newRoom = function(roomName){
    connectSvc.newRoom(roomName).then(function(response){
      $scope.roomNew = response;
    });
  };
  $scope.getUsers = function(){
    connectSvc.getCurrentUser().then(function(response){
      $scope.user = response;
    });
  };
  $scope.addToChat = function(fid, chatid){
    connectSvc.addToChat(fid, chatid).then(function(response){
      $scope.addedUserToChat = response;
    });
  };
  $scope.addMsg = function(message, chatid){
    connectSvc.addMsg(message, chatid).then(function(response){
      $scope.chatid = chatid;
      $scope.msgAdded = response;
      $scope.getMessages(chatid);
      $scope.newMsg='';
    });
  };

  $scope.getChatRooms = function(chatid){
    clearInterval($scope.interval);
    $scope.chatid = chatid;
  $scope.interval = setInterval($scope.getMessages, 500);
    connectSvc.getChatRooms(chatid).then(function(response){
      $scope.messages = response.messages;
      $scope.roomNew = response;

      // console.log($scope.messages)
    });
  };
  $scope.$on("$destroy", function(){
    clearInterval($scope.interval);
  });

  $scope.chatUserIn = function(){
    connectSvc.chatUserIn().then(function(response){
      $scope.allowedChats = response;

    });
  };

    $scope.username = user.username;
    console.log(user);
    $scope.logout = function() {
        loginSvc.logout().then(function(response) {
            $scope.loggedOut = response;
            $scope.user = response.username;
            if (response) {
                $state.go('homepage');
            }
        });
    };
    $scope.getUser = function(user) {};

    $scope.getUsers = function(){
      loginSvc.getUsers().then(function(response){
        $scope.allUsers = response;
      });
    };
    $scope.addFriend = function(user){
      loginSvc.addFriend(user).then(function(response){
        $scope.addedFriend = response;
      });
    };


});
