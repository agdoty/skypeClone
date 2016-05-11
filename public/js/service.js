angular.module('skypeClone').service('service', function($http) {
    //WORKING
    this.getUser = function(user) { //GETS A SPECIFIC USER
        return $http({
            method: "GET",
            url: "/api/user?username=" + user.username + "&password=" + user.password
        }).then(function(response) {
            return response.data;
        });
    };
    //WORKING
    this.getUsers = function() { //GETS ALL USERS
        return $http({
            method: "GET",
            url: "/api/user"
        }).then(function(response) {
            return response.data;
        });
    };
    //WORKING
    this.postUser = function(user) { //CREATE NEW USER AND STORE IN BACKEND
        return $http({
            method: "POST",
            url: "/api/user",
            data: user
        }).then(function(response) {
            return response.data;
        });
    };
    //WORKING
    this.deleteUser = function(userDelete) { //DELETES A SPECIFIC USER
        return $http({
            method: "DELETE",
            url: "/api/user?username=" + userDelete.username + "&password=" + userDelete.password,
        }).then(function(response) {
            return response.data;
        });
    };
    // WORKING
    this.updateUsername = function(usernameUpdate) { //DELETES A SPECIFIC USER
        return $http({
            method: "PUT",
            url: "/api/user?username=" + usernameUpdate.usernameOld, //query
            data: { //gets assigned to req.body on backend
            username: usernameUpdate.usernameNew
            }
        }).then(function(response) {
            return response.data;
        });
    };

    this.updatePassword = function(passwordUpdate) { //DELETES A SPECIFIC USER
        return $http({
            method: "PUT",
            url: "/api/user?password=" + passwordUpdate.passwordOld, //query
            data: { //gets assigned to req.body on backend
            password: passwordUpdate.passwordNew
            }
        }).then(function(response) {
            return response.data;
        });
    };

});
