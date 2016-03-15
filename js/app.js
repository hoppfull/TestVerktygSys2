(function() {
    var indexApp = angular.module("indexApp", ['ngRoute']);
	
    indexApp.controller('mainController', function($scope, loginService, dataService) {
    });

    indexApp.service('dataService', function($http, loginService) {
        var users = [];
        var exams = [];
        var subjects = [];
        var studentClasses = [];

        $http.get('../data/master.json').success(function(response) { // tested: works
            users = response.users;
            exams = response.exams;
            subjects = response.subjects;
            studentClasses = response.studentClasses;
        });

        var getUsers = function() { // tested: works
            return users;
        };

        var getExams = function() { // tested: works
            return exams;
        };

        var getSubjects = function() { // tested: works
            return subjects;
        };

        var getStudentClasses = function() { // tested: works
            return studentClasses;
        };

        var addUser = function(newUser) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: addUser code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: addUser code 2");
                return false;
            }
            if (users.find(user => user.username.toLowerCase() === newUser.username.toLowerCase())) {
                console.log("Error: addUser code 3");
                return false;
            } else {
                console.log("success! addUser code 1");
                users.push(newUser);
                return true;
            }
        };

        var addExam = function(newExam) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: addExam code 1");
                return false;
            }
            if (loginService.getUser().type !== 'teacher') {
                console.log("Error: addExam code 2");
                return false;
            }
            if (exams.find(exam => exam.name.toLowerCase() === newExam.name.toLowerCase())) {
                console.log("Error: addExam code 3");
                return false;
            } else {
                console.log("success! addExam code 1");
                exams.push(newExam);
                return true;
            }
        };

        var addSubject = function(newSubject) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: addSubject code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: addSubject code 2");
                return false;
            }
            if (subjects.find(subject => subject.toLowerCase() === newSubject.toLowerCase())) {
                console.log("Error: addSubject code 3");
                return false;
            } else {
                console.log("success! addSubject code 1");
                subjects.push(newSubject);
                return true;
            }
        };

        var addStudentClass = function(newStudentClass) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: addStudentClass code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: addStudentClass code 2");
                return false;
            }
            if (studentClasses.find(studentClass => studentClass.toLowerCase() === newStudentClass.toLowerCase())) {
                console.log("Error: addStudentClass code 3");
                return false;
            } else {
                console.log("success! addStudentClass code 1");
                studentClasses.push(newStudentClass);
                return true;
            }
        };

        var removeUser = function(username) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: removeUser code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: removeUser code 2");
                return false;
            }
            // Find index of user object with username:
            var i = users.indexOf(users.find(user => user.username === username));
            if (0 <= i) { // if i == -1, then username wasn't in users
                console.log("success! removeUser code 1");
                users.splice(i, 1);
                return true;
            } else {
                console.log("Error: removeUser code 3");
                return false;
            }
        };

        var removeExam = function(examName) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: removeExam code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin' && loginService.getUser().type !== 'teacher') {
                console.log("Error: removeExam code 2");
                return false;
            }

            var currentExam = exams.find(exam => exam.name === examName);
            if (!currentExam) {
                console.log("Error: exam could not be found for removal.");
                return false;
            }
            if (loginService.getUser().type === 'admin') {
                if (currentExam.sentToAdmin && !currentExam.sentToStudent) {
                    exams.splice(exams.indexOf(currentExam), 1); // no need to check for validity of index???
                    console.log("success! removeExam code 1 (admin)");
                    return true;
                } else {
                    console.log("Error: admin can only remove exam if exam is sent to admin and not sent to student!");
                    return false;
                }
            } else if (loginService.getUser().type === 'teacher') {
                if (!currentExam.sentToAdmin) {
                    exams.splice(exams.indexOf(currentExam), 1); // no need to check for validity of index???
                    console.log("success! removeExam code 2 (teacher)");
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

        var removeSubject = function(subjectName) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: removeSubject code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: removeSubject code 2");
                return false;
            }

            var currentSubject = subjects.find(subject => subject === subjectName);
            if (!currentSubject) {
                console.log("Error: no such subject exists!");
                return false;
            }
            if (loginService.getUser().type === 'admin') {
                subjects.splice(subjects.indexOf(currentSubject), 1);
                console.log("success! removeSubject code 1");
                return true;
            } else {
                console.log("Error: Only admin can remove subjects!");
                return false;
            }
        };

        var removeStudentClass = function(studentClassName) { // tested: works
            if (loginService.getUser() === null) {
                console.log("Error: removeStudentClass code 1");
                return false;
            }
            if (loginService.getUser().type !== 'admin') {
                console.log("Error: removeStudentClass code 2");
                return false;
            }

            var currentStudentClass = studentClasses.find(studentClass => studentClass === studentClassName);
            if (!currentStudentClass) {
                console.log("Error: no such student class exists!");
                return false;
            }
            if (loginService.getUser().type === 'admin') {
                studentClasses.splice(studentClasses.indexOf(currentStudentClass), 1);
                console.log("success! removeStudentClass code 1");
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

    indexApp.service('loginService', function() { // tested: works
        var user = null;

        var getUser = function() {
            return user;
        };

        var login = function(loginUser) {
            /*if (!user) {
                return false;
            } else {*/
            user = loginUser;
            location.href = '#/' + loginUser.type;
            return true;
            /*}*/
        };

        var logout = function() {
            user = null;
            location.href = '#/';
        };

        return {
            getUser: getUser,
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
            .when('/teacher', {
                templateUrl: 'html/teacher.html',
                controller: 'teacherController'
            })
            .otherwise({ redirectTo: '/login' });
    });
} ());
