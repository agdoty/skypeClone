angular.module('skypeClone').controller('loginCtrl', function($scope, loginSvc, $state) {

  $scope.login = function(currentUser){
    console.log(currentUser);

    loginSvc.login(currentUser)
    .then(function(response){
      console.log(response);
      // $scope.getUser(response.id);
      // $scope.loggedIn = response;
      // console.log(response);
      // $scope.user = response.username;
    if(response.id){
      $state.go('userHome');
    }
    });
  };
});
