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
    // if(response.id){
    // // if(true){
    //   $state.go('userHome');
    // }
    });
  };

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
