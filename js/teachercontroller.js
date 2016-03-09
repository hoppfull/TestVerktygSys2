(function () {
    angular.module("indexApp").controller("teacherController", function ($scope, dataService, loginService) {
        $scope.loggedIn = false;
        if (loginService.user != null) {
            $scope.loggedIn = true;
            $scope.TeacherName = loginService.user.username;
            updateQuizList();
            
            
            $scope.logout = function () {
                loginService.logout();
            };

            $scope.newQuizSubmit = function () {
                if (!$scope.quizzes.find(quiz => quiz.name.toLowerCase() === $scope.newQuizName.toLowerCase())) {
                    var newQuiz = {
                        author: $scope.TeacherName,
                        time: $scope.newQuizTime,
                        name: $scope.newQuizName,
                        subject: $scope.newQuizSubject,
                        questions: []
                    };
                    dataService.addQuiz(newQuiz);
                    updateQuizList();
                    
                    $scope.addQuizMsg = '';
                } else {
                    $scope.addQuizMsg = 'Namn finns redan!';
                }
            };

            function updateQuizList() {
                
                $scope.quizzes = dataService.quizzes.filter(quiz => quiz.author === loginService.user.username);
            }
        }
    });
} ());
