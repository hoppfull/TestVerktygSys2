(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, loginService) {

        loginService.login(dataService.getUsers().find(user => user.username === 'teacher'));
        $scope.TeacherName = loginService.getUser().firstName;
        $scope.exams = dataService.getExams();

        $scope.options = [{ name: 'Envalsfråga', value: 'radio' },
            { name: 'Flervalsfrågor', value: 'checkbox' },
            { namn: 'Ragnordning', value: 'ranked' }];
        $scope.selectedOption = $scope.options[0];
       
        $scope.AddExamsToList = function() {
            var NewExams = {
                author: $scope.TeacherName,
                time: $scope.newQuizTime,
                name: $scope.newQuizName,
                subject: $scope.newQuizSubject,
                sentToAdmin: false,
                questions: [{
                    type: 'radio',
                    answers: [{
                        text: "",
                        point: -1,
                        checked: false,
                        rank: 0
                    }]
                }]
            };
            dataService.addExam(NewExams);
        };
        $scope.removeQuiz = function(name) {
            console.log(dataService.getExams());
            dataService.removeExam(name);

        };
        $scope.editExam = function(quiz) {
            $scope.currnetExamForEditing = quiz;
            $scope.editQuestions = $scope.currnetExamForEditing.questions;
        }
        $scope.Test = function(asd) {
            alert(asd);
        };
        $scope.addAnswer = function(Question) {
            var newAnswer = {
                text: "",
                point: -1,
                checked: false,
                rank: 0
            }
            console.log(Question.answers)
            Question.answers.push(newAnswer);

        };
        $scope.RemoveAnswer = function(Question, Answer) {
            Question.answers.splice(Question.answers.indexOf(Answer), 1);
        }

        $scope.AddNewQuestion = function() {
            var Question = {
                text: 'Add Test?',
                type: 'radio',
                answers: [{
                    text: "",
                    point: -1,
                    checked: false,
                    rank: 0
                }]
            };
            $scope.currnetExamForEditing.questions.push(Question);
        }
        $scope.SelectExamType = function() {
        }
         $scope.SendExam = function(Question){
             $scope.ExamToSendToAdmin = Question;
             $scope.ExamToSendToAdmin.sentToAdmin = true;
         };

        $scope.loggedIn = true;
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
            dataService.getExams().find().questions.push();
            function updateQuizList() {
                $scope.quizzes = dataService.quizzes.filter(quiz => quiz.author === loginService.user.username);
            }

        }
    });
} ());
