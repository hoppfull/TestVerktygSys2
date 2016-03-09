(function () {
    var indexApp = angular.module("indexApp", ['ngRoute']);

    indexApp.controller('mainController', function ($scope, $http, dataService) {
        (function () { // Author: bjorn
            // This function loads data into dataService
            $http.get('../data/admins.json').success(function (response) {
                response.admins.forEach(admin => {
                    admin.type = "admin";
                    dataService.addUser(admin);
                });
            });
            $http.get('../data/students.json').success(function (response) {
                response.students.forEach(student => {
                    student.type = "student";
                    dataService.addUser(student);
                });
            });
            $http.get('../data/teachers.json').success(function (response) {
                response.teachers.forEach(teacher => {
                    teacher.type = "teacher";
                    dataService.addUser(teacher);
                });
            });
            $http.get('../data/questioner.json').success(function (response) {
                response.quizzes.forEach(quiz => {
                    dataService.addQuiz(quiz);
                });
            });
        })();
    });

    indexApp.service('dataService', function () {
        var users = [];
        var quizzes = [];

        var addUser = function (user) {
            users.push(user);
        };
        
        var addQuiz = function(quiz) {
            quizzes.push(quiz);
        }

        return {
            users: users,
            addUser: addUser,
            quizzes: quizzes,
            addQuiz: addQuiz
        };
    });

    indexApp.service('loginService', function () {
        var user = null;

        var logout = function () {
            user = null;
            location.href = '';
        };

        return {
            user: user,
            logout: logout
        };
    });

    indexApp.config(function ($routeProvider) { 
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
            .when('/studentTab',{
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
            .when('/teacherTab',{
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
             .when('/adminTab',{
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
            .when('/teacher', {
                templateUrl: 'html/teacher.html',
                controller: 'teacherController'
            })
            .otherwise({ redirectTo: '/login' });
    });
} ());
