angular.module('skypeClone').controller('createUserCtrl', function($scope, createUserSvc, $state) {
  $scope.createUser = function(userCreate) {
      createUserSvc.createUser(userCreate).then(function(response) {
          $scope.newUser = response;
          alert('thanks for making an account with us');
          $scope.userCreate = '';
      });
  };
});
