(function () {
    var mainApp = angular.module("mainApp", ['ngRoute']);

    mainApp.controller('mainController', function ($scope) {
    });

    mainApp.config(function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'html/login.html',
            controller: 'loginController'
        })
            .otherwise({ redirectTo: '/login' });
    });
} ());