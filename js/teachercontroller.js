(function () {
    angular.module("indexApp").controller("teacherController", function ($scope, dataService, loginService) {
        $scope.loggedIn = false;
        if (loginService.user != null) {
            $scope.loggedIn = true;
            $scope.TeacherName = loginService.user.username;
            $scope.quizzes = dataService.quizzes.filter(quiz => quiz.author === loginService.user.username);

            $scope.logout = function () {
                loginService.logout();
            };
        }

        $scope.myFunc = function () {
            console.log("tjena");
        };
    });
} ());
