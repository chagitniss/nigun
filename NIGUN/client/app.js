
var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: "views/home.html"
            //controller: "homeController"
        })
        .when('/contact', {
            templateUrl: "views/contact.html",
            controller: "contactController"
        })
        .when('/addsong', {
            templateUrl: "views/addsong.html",
            controller: "contactController"
        })
        .when('/GuitarTuning', {
            templateUrl: "views/GuitarTuning.html",
            controller: "contactController"
        })
        .when('/login', {
            templateUrl: "views/login.html",
            controller: "contactController"
        })
         .when('/register', {
            templateUrl: "views/register.html",
            controller: "contactController"
        })
        .when('/dictionary', {
            templateUrl: "views/dictionary.html",
            controller: "contactController"
        })
        .when('/artists', {
            templateUrl: "views/artists.html",
            controller: "artistsController"
        })
        .when('/artists/:name', {
            templateUrl: "views/artistShow.html",
            controller: "artistShowController"
        })

        .otherwise({redirectTo:'/home'});
});

myApp.controller("artistsController", ["$scope", "$http", artistsController]);
myApp.controller("artistShowController", ["$scope",  "$routeParams", "$http", artistShowController]);
