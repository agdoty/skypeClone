angular.module('skypeClone').controller('userHomeCtrl', function($scope, loginSvc, user, $state) {
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
