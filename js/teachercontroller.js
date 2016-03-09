(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, loginService) {
        $scope.loggedIn = false;
        if (loginService.user != null) {
            $scope.loggedIn = true;
            $scope.TeacherName = loginService.user.username;
            updateQuizList();

            $scope.logout = function() {
                loginService.logout();
            };
            
            $scope.removeQuiz = function(name, author) {
                dataService.removeQuiz(name, author);
                updateQuizList();
            };
            
            $scope.newQuizSubmit = function() {
                var newQuiz = {
                    author: $scope.TeacherName,
                    time: $scope.newQuizTime,
                    name: $scope.newQuizName,
                    subject: $scope.newQuizSubject,
                    questions: []
                };
                $scope.addQuizMsg =
                    dataService.addQuiz(newQuiz)
                        ? ''
                        : 'Namn finns redan!';
                updateQuizList();
            };

            function updateQuizList() {
                $scope.quizzes = dataService.quizzes.filter(quiz => quiz.author === loginService.user.username);
            }
        }
    });
} ());
