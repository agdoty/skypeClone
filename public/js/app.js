angular.module('skypeClone', ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('homepage', {
                url: '/homepage',
                templateUrl: './views/homepage.html',
                controller: 'mainCtrl'
            })
            .state('help', {
                url: '/help',
                templateUrl: './views/help.html',
                controller: 'helpCtrl'
            })
            .state('about', {
                url: "/about",
                templateUrl: './views/about.html',
                controller:"aboutCtrl"
            })
            .state('login', {
                url: '/login',
                templateUrl: './views/login.html',
                controller: 'loginCtrl'
            })
            .state('createUser', {
                url: '/newUser',
                templateUrl: './views/createUser.html',
                controller: 'createUserCtrl'
            })
            .state('userHome', {
                url: '/userHome',
                templateUrl: './views/userHome.html',
                controller: 'userHomeCtrl',
                resolve: {
                    user: function(loginSvc, $state) {
                        return loginSvc.getCurrentUser().then(function(response) {
                            console.log(response);
                            if (!response.data) {
                                $state.go('login');
                            } else {
                                return response.data;
                            }
                        });
                    }
                }
            })
            .state('connect', {
              url:'/connect',
              templateUrl:'./views/connect.html',
              controller: 'connectCtrl'
            });
        $urlRouterProvider.otherwise('/homepage');
    });
