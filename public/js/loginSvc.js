angular.module('skypeClone').service('loginSvc', function($http) {
  this.login = function(currentUser){
    return $http({
      method:"POST",
      url:"/login",
      data: currentUser
    }).then(function(response){
      return response.data;
    });
  };
  this.logout = function(){
    return $http({
      method: "GET",
      url: "/logout"
    }).then(function(response){
      return response;
    });
  };

this.getUser = function(user){
  return $http({
    method: "GET",
    url:'/api/user/' + user
  }).then(function(response){
    return response;
  });
};

this.getCurrentUser = function(){
  return $http({
    method: "GET",
    url:'/api/current/user'
  }).then(function(response){
    return response;
  });
};
});
