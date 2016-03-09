(function () {
    angular.module("indexApp").controller("teacherController", function ($scope, dataService, loginService) {
        /*var students = dataService.users.filter(user => user.type === "student");

        var x = [];
        students.forEach(student => student.exam.forEach(exam => x.push({
            username: student.username,
            examName: exam.name,
            availableFrom: exam.availableFrom,
            availableUntil: exam.availableUntil
        })));

        $scope.p = x; */
        $scope.loggedIn = false;
        if (loginService.user != null) {
            $scope.loggedIn = true;
            $scope.TeacherName = loginService.user.username;
            $scope.logout = function () {
                loginService.logout();
            };
        }


        $scope.quizzes = dataService.quizzes;
        var deletebutton = function (x) {

        }
    });
} ());
