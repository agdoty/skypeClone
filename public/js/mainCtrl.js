angular.module('skypeClone').controller('mainCtrl', function($scope, service, $state) {

    console.log('hit0');
    //WORKING
    // $scope.getUser = function(user) {
    //     service.getUser(user).then(function(response) {
    //         if (response[0]._id) {
    //             $scope.user = response[0];
    //             console.log($scope.user);
    //         }
    //     });
    // };
    //WORKING
    $scope.getUsers = function() {
        service.getUsers().then(function(response) {
            console.log(response);
        });
    };
    //WORKING
    $scope.postUser = function(newUserInfo) {
        service.postUser(newUserInfo).then(function(response) {
            $scope.newUser = response;
        });
    };

    $scope.deleteUser = function(userDelete) {
        service.deleteUser(userDelete).then(function(response) {
            console.log(response);
            if (response[0]._id) {
                console.log('hit 2');
                $scope.userDelete = response[0];
                // console.log($scope.userDelete);
            }
        });
    };

    $scope.updateUsername = function(usernameUpdate){
      service.updateUsername(usernameUpdate).then(function(response){
        console.log(response);
        if(usernameUpdate.usernameOld){
          $scope.usernameUpdate = response[0];
        }
      });
    };

    $scope.updatePassword = function(passwordUpdate){
      console.log('hit2');
      service.updatePassword(passwordUpdate).then(function(response){
        console.log(response);
        if(passwordUpdate.passwordOld){
          $scope.passwordUpdate = response[0];
        }
      });
    };
});
