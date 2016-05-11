angular.module('skypeClone').service('createUserSvc', function($http) {
  this.createUser = function(userCreate) { //CREATE NEW USER AND STORE IN BACKEND
      return $http({
          method: "POST",
          url: "/api/user",
          data: userCreate
      }).then(function(response) {
          return response.data;
      });
  };
});
