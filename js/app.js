(function () {
    var mainApp = angular.module("mainApp", ['ngRoute']);

    mainApp.controller('mainController', function ($scope) {
    });

    mainApp.config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'html/login.html',
                controller: 'loginController'
            })
            .when('/admin', {
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
            .when('/student', {
                templateUrl: 'html/student.html',
                controller: 'studentController'
            })
            .when('/teacher', {
                templateUrl: 'html/student.html',
                controller: 'teacherController'
            })
            .otherwise({ redirectTo: '/login' });
    });
} ());
