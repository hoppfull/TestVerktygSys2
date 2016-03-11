(function() {
    var indexApp = angular.module("indexApp", ['ngRoute']);

    indexApp.controller('mainController', function($scope, $http, dataService) {
    });

    indexApp.service('dataService', function($http, loginService) {
        var users = [];
        var exams = [];
        var subjects = [];
        var studentClasses = [];

        $http.get('../data/master.json').success(function(response) {
            users = response.users;
            exams = response.exams;
            subjects = response.subjects;
            studentClasses = response.studentClasses;
        });

        var getUsers = function() {
            return users;
        };

        var getExams = function() {
            return exams;
        };

        var getSubjects = function() {
            return subjects;
        };

        var getStudentClasses = function() {
            return studentClasses;
        };

        var addUser = function(newUser) {
            if (loginService.user.type !== 'admin') {
                console.log('Error: only admins can add users!');
                return false;
            }
            if (users.find(user => user.username.toLowerCase() === newUser.username.toLowerCase())) {
                return false;
            } else {
                users.push(newUser);
                return true;
            }
        };

        var addExam = function(newExam) {
            if (loginService.user.type !== 'teacher') {
                console.log('Error: only teachers can add exams!');
                return false;
            }
            if (exams.find(exam => exam.name.toLowerCase() === newExam.name.toLowerCase())) {
                return false;
            } else {
                exams.push(newExam);
                return true;
            }
        };

        var addSubject = function(newSubject) {
            if (loginService.user.type !== 'admin') {
                console.log('Error: only admin can add subjects!');
                return false;
            }
            if (subjects.find(subject => subject.toLowerCase() === newSubject.toLowerCase())) {
                return false;
            } else {
                subjects.push(newSubject);
                return true;
            }
        };

        var addStudentClass = function(newStudentClas) {
            if (loginService.user.type !== 'admin') {
                console.log('Error: only admin can add student classes!');
                return false;
            }
            if (studentClasses.find(studentClass => studentClass.toLowerCase() === newStudentClas.toLowerCase())) {
                return false;
            } else {
                studentClasses.push(newStudentClass);
                return true;
            }
        };

        var removeUser = function(username) {
            if (loginService.user.type !== 'admin') {
                console.log('Error: only admin can remove users!');
                return false;
            }
            // Find index of user object with username:
            var i = users.indexOf(users.find(user => user.username === username));
            if (0 <= i) { // if i == -1, then username wasn't in users
                users.splice(i, 1);
                return true;
            } else {
                return false;
            }
        };

        var removeExam = function(examName) {
            var currentExam = exams.find(exam => exam.name === examName);
            if (!currentExam) {
                console.log("Error: exam could not be found for removal.");
                return false;
            }
            if (loginService.user.type === 'admin') {
                if (currentExam.sentToAdmin && !currentExam.sentToStudent) {
                    exams.splice(indexOf(currentExam), 1); // no need to check for validity of index???
                    return true;
                } else {
                    console.log("Error: admin can only remove exam if exam is sent to admin and not sent to student!");
                    return false;
                }
            } else if (loginService.user.type === 'teacher') {
                if (!currentExam.sentToAdmin) {
                    exams.splice(indexOf(currentExam), 1); // no need to check for validity of index???
                    return true;
                } else {
                    console.log("Error: teacher can only remove exam if exam is not sent to admin!");
                    return false;
                }
            } else {
                console.log("Error: Only teacher or admin can remove exams!");
                return false;
            }
        };

        var removeSubject = function(subjectName) {
            var currentSubject = subjects.find(subject => subject === subjectName);
            if (!currentSubject) {
                console.log("Error: no such subject exists!");
                return false;
            }
            if (loginService.user.type === 'admin') {
                subjects.splice(indexOf(currentSubject), 1);
                return true;
            } else {
                console.log("Error: Only admin can remove subjects!");
                return false;
            }
        };

        var removeStudentClass = function(studentClassName) {
            var currentStudentClass = studentClasses.find(studentClass => studentClass === studentClassName);
            if (!currentStudentClass) {
                console.log("Error: no such student class exists!");
                return false;
            }
            if (loginService.user.type === 'admin') {
                studentClasses.splice(indexOf(currentStudentClass), 1);
                return true;
            } else {
                console.log("Error: Only admin can remove student classes!");
                return false;
            }
        };

        return {
            getUsers: getUsers,
            getExams: getExams,
            getSubjects: getSubjects,
            getStudentClasses: getStudentClasses,
            addUser: addUser,
            addExam: addExam,
            addSubject: addSubject,
            addStudentClass: addStudentClass,
            removeUser: removeUser,
            removeExam: removeExam,
            removeSubject: removeSubject,
            removeStudentClass: removeStudentClass
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
