(function() {
    angular.module("indexApp").controller("adminController", function($scope, dataService, loginService) {
        loginService.login(dataService.getUsers().find(user => user.type === 'admin'));
        $scope.name = loginService.getUser().firstName + ' ' + loginService.getUser().lastName;
        $scope.logout = function () {
            loginService.logout();
        };
        
        function updateLists() {
            $scope.exams = dataService.getExams().filter(exam => exam.sentToAdmin && !exam.sentToStudent);
            $scope.students = dataService.getUsers().filter(user => user.type === 'student');
            $scope.admins = dataService.getUsers().filter(user => user.type === 'admin');
            $scope.teachers = dataService.getUsers()
                .filter(user => user.type === 'teacher')
                .map(user => ({
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    subjects: user.subjects.length === 0 ? "" : user.subjects.reduce((a, b) => a + ', ' + b)
                }));
        }

        $scope.closeTabs = function() {
            $scope.showStudents = false;
            $scope.showTeachers = false;
            $scope.showAdmins = false;
        };

        updateLists();

        $scope.removeUser = function(userName) {
            dataService.removeUser(userName);
            updateLists();
        };

        $scope.addUserSubmit = function() {
            var newUser = {
                username: $scope.newUserName,
                firstName: $scope.newUserFirstName,
                lastName: $scope.newUserLastName,
                password: $scope.newUserPassword,
                type: $scope.showStudents ? "student" : $scope.showTeachers ? "teacher" : $scope.showAdmins ? "admin" : ""
            };

            if (dataService.addUser(newUser)) {
                $("[data-dismiss=modal]").trigger({ type: "click" });
                
                $scope.newUserName = "";
                $scope.newUserFirstName = "";
                $scope.newUserLastName = "";
                $scope.newUserPassword = "";
                $scope.newUserStudentClass = "";
                
                updateLists();
            }
        };
        
        
    });
} ());