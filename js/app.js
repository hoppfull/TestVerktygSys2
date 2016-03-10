(function() {
    var indexApp = angular.module("indexApp", ['ngRoute']);

    indexApp.controller('mainController', function($scope, $http, dataService) {
        (function() { // Author: bjorn
            // This function loads data into dataService
            $http.get('../data/admins.json').success(function(response) {
                response.admins.forEach(admin => {
                    admin.type = "admin";
                    dataService.addUser(admin);
                });
            });
            $http.get('../data/students.json').success(function(response) {
                response.students.forEach(student => {
                    student.type = "student";
                    dataService.addUser(student);
                });
            });
            $http.get('../data/teachers.json').success(function(response) {
                response.teachers.forEach(teacher => {
                    teacher.type = "teacher";
                    dataService.addUser(teacher);
                });
            });
            $http.get('../data/questioner.json').success(function(response) {
                response.quizzes.forEach(quiz => {
                    dataService.addQuiz(quiz);
                });
            });
        })();
    });

    indexApp.service('dataService', function() {
        var users = [];
        var quizzes = [];

        var getUsers = function() {
            return users;
        };

        var addUser = function(newUser) {
            if (users.find(user => user.username.toLowerCase() === newUser.username.toLowerCase())) {
                return false;
            } else {
                users.push(newUser);
                return true;
            }
        };

        var removeUser = function(name) {
            var i = users.indexOf(users.find(user => user.username === name));
            if (0 <= i) {
                users.splice(i, 1);
                return true;
            } else {
                return false;
            }
        }

        var getQuizzes = function() {
            return quizzes;
        };

        var addQuiz = function(newQuiz) {
            if (quizzes.find(quiz => quiz.name.toLowerCase() === newQuiz.name.toLowerCase() && quiz.author === newQuiz.author)) {
                return false;
            } else {
                quizzes.push(newQuiz);
                return true;
            }
        }

        var removeQuiz = function(name, author) {
            var i = quizzes.indexOf(quizzes.find(quiz => quiz.name === name && quiz.author === author));
            if (0 <= i) {
                quizzes.splice(i, 1);
                return true;
            } else {
                return false;
            }
        };

        return {
            getUsers: getUsers,
            addUser: addUser,
            removeUser: removeUser,
            getQuizzes: getQuizzes,
            addQuiz: addQuiz,
            removeQuiz: removeQuiz
        };
    });

    indexApp.service('loginService', function(dataService) {
        var user = null;

        var getLoggedInUser = function() {
            return user;
        };

        var login = function(username, password) {
            user = dataService.getUsers().find(user => user.username === username && user.password === password);
            if (!user) {
                return false;
            } else {
                location.href = '#/' + user.type;
                return true;
            }
        };

        var logout = function() {
            user = null;
            location.href = '#/';
        };

        return {
            getLoggedInUser: getLoggedInUser,
            login: login,
            logout: logout
        };
    });

    indexApp.config(function($routeProvider) {
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
            .when('/studentTab', {
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
            .when('/teacherTab', {
                templateUrl: 'html/admin.html',
                controller: 'adminController'
            })
            .when('/adminTab', {
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
