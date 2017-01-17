angular.module('skypeClone').controller('mainCtrl', function($scope, service, $state) {

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

    $(document).ready(function() {



$('.circle').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {
    $("#fb").css({
          "left":"0px",
          "top":"0px",
          "border-radius":"50px",
          "height":"45px",
          "width":"45px",
          "z-index":"-1",
          "-webkit-transition": ".4s",
          "-moz-transition":".4s",
          "-o-transition":" .4s",
          "transition": ".4s"
        });
        $("#close").css({
          "visibility":"hidden"
        })
        $(".ham-menu-container").css({
          "visibility":"hidden"
        })
        $(".center-the-txt").css({
          "visibility":"hidden"
        })
  } else {


        $("#fb").css({ //upper right
               "left":"-313px",
               "top":"-5px",
               "z-index":"20",
               "border-radius":"0px",
               "width":"375px",
               "height": "calc(100vh + 5px)",
               "-webkit-transition": ".5s",
               "-moz-transition":".5s",
               "-o-transition":" .5s",
               "transition": ".5s"
             });
        $("#close").css({
          "visibility":"visible"
        })
        $(".ham-menu-container").css({
          "visibility":"visible"
        })
        $(".ham-menu-container").click(function(){
          $state.go('about');
        })
        $(".center-the-txt").css({
          "visibility":"visible"
        })
  }
  $(this).data("clicks", !clicks);
});


});

});
