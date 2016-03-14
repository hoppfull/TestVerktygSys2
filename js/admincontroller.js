(function() {
    angular.module("indexApp").controller("adminController", function($scope, dataService, loginService) {
        loginService.login(dataService.getUsers().find(user => user.type === 'admin'));
        $scope.name = loginService.getUser().firstName + ' ' + loginService.getUser().lastName;
        $scope.logout = function () {
            loginService.logout();
        };
        function updateLists() {
            $scope.subjects = dataService.getSubjects();
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
                type: $scope.showStudents ? "student" : $scope.showTeachers ? "teacher" : $scope.showAdmins ? "admin" : "",
                studentClass: $scope.showStudents ? $scope.newUserStudentClass : "",
                subjects: []
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

        /*
        $scope.sendTest = function() {
            $window.alert("Proven är skickade");
        };

        $scope.removeRowExams = function(testIndex) {
            $scope.tests.splice(testIndex, 1);
        };

        $scope.addUser = function() {
            $scope.users.push({
                occupation: $scope._occupation,
                firstName: $scope._firstName,
                lastName: $scope._lastName,
                username: $scope._userName,
                password: $scope._password
            });
            $scope._occupation = "";
            $scope._firstName = "";
            $scope._lastName = "";
            $scope._userName = "";
            $scope._password = "";
        };
        $scope.userToRemove;
        $scope.removeRowUser = function(hash) {
            $scope.userToRemove = hash;
        };
        $scope.deleteUser = function() {
            if ($scope.userToRemove != null) {
                $scope.users.splice($scope.userToRemove, 1);
                $scope.userToRemove = null;
            }

        }
        $scope.questionType = function(type) {
            return type === "SingleChoice" ? "radio" : "checkbox";
        };*/
        /*  setTimeout(function(){
              loginService.logout();
          }, 3000);*/
        /*
      $scope.AdminLogout = function() {
          loginService.logout();
      }*/
        /*
        $scope.hej = function() {
            $(".datepicker").datepicker();
        };*/
    });
} ());