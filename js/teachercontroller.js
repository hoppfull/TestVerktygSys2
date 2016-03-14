(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, loginService) {
        $scope.loggedIn = false;
        if (loginService.user != null) {
            $scope.loggedIn = true;
            $scope.TeacherName = loginService.user.username;
            $scope.newQuiz = [];
            updateQuizList();

            $scope.logout = function() {
                loginService.logout();
            };

            $scope.removeQuiz = function(name, author) {
                dataService.removeQuiz(name, author);
                updateQuizList();
            };
            
            $scope.newQuizSubmit = function() {
                 newQuiz = {
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

            $scope.editTest = function(quiz) {
                $scope.testName = quiz.name;
                $scope.testAuthor = quiz.author;
                $scope.testTime = quiz.time;
                $scope.testQuizes = quiz.questions;

            };

            $scope.removeQuestion = function(name, author, text) {
                console.log(name + author + text);
                dataService.removeSingleQuiz(name, author, text);
                updateQuizList();
            };

            $scope.saveQuestion = function(quiz) {
                var x = {
                    question: $scope.newQuestion,
                    type: $scope.newQuestionType,
                    score: $scope.newPoint,
                    answers: [
                        {
                            answerText: $scope.newAnswer,
                        }
                    ]
                };
                quiz.push(x);
            };
            $scope.addAnswerToQuestion = function () {
                newQuiz = {
                    question: "Hej"
                }
                
                alert("TjaS");    
            }
            

            function updateQuizList() {
                $scope.quizzes = dataService.quizzes.filter(quiz => quiz.author === loginService.user.username);
            }
        }
    });
} ());
