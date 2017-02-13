
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
            controller: "addsongController"
        })
        .when('/GuitarTuning', {
            templateUrl: "views/GuitarTuning.html",
            controller: "contactController"
        })
        .when('/login', {
            templateUrl: "views/login.html",
            controller: "contactController"
        })
         .when('/showSearch', {
            templateUrl: "views/showSearch.html",
            controller: "artistsController"
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
        .when('/artists/:name?', {
            templateUrl: "views/artistShow.html",
            controller: "artistShowController"
        })
        .when('/artists/:artistName/:name', {
            templateUrl: "views/songShow.html",
            controller: "songShowController"
        })
        .when('/addSongSuccess', {
            templateUrl: "views/addSongSuccess.html",
            controller: "addsongController"
        })
        .when('/admin', {
            templateUrl: "views/admin.html",
            controller: "adminController"
        })
        .when('/kategories/:name?', {
            templateUrl: "views/typeShow.html",
            controller: "typeShowController"
        })
        .when('/admin/updateSong/:artistName/:name', {
            templateUrl: "views/updateSong.html",
            controller: "updateSongController"
        })


        .otherwise({redirectTo:'/home'});
});

myApp.controller("artistsController", ["$scope", "$http", artistsController]);
myApp.controller("artistShowController", ["$scope",  "$routeParams", "$http", artistShowController]);
myApp.controller("songShowController", ["$scope",  "$routeParams", "$http", songShowController]);
myApp.controller("typeShowController", ["$scope","$routeParams", "$http", typeShowController]);
myApp.controller("updateSongController", ["$scope","$routeParams", "$http", updateSongController]);
myApp.controller("addsongController", ["$scope", "$http", addsongController]);
myApp.controller("adminController", ["$scope", "$http", adminController]);

