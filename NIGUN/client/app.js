
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
        .when('/chords', {
            templateUrl: "views/chords.html",
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
            controller: "artistsController"
        })

        .otherwise({redirectTo:'/home'});
});



//myApp.controller("artistsController", ["$scope", "$http", artistsController]);


myApp.controller("artistsController", ["$scope", "$http", artistsController]);
