(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, loginService) {

        //loginService.login(dataService.getUsers().find(user => user.username === 'teacher'));
        $scope.logout = function() {
            loginService.logout();
        };
        $scope.TeacherName = loginService.getUser().firstName + ' ' + loginService.getUser().lastName;
        $scope.exams = dataService.getExams();

        $scope.options = [{ name: 'Envalsfråga', value: 'radio' },
            { name: 'Flervalsfrågor', value: 'checkbox' },
            { name: 'Ragnordning', value: 'number' }];
        $scope.selectedOption = $scope.options[0];

        function createDefaultExam() {
            return {
                name: "",
                subject: "",
                authorName: loginService.getUser().username,
                studentName: "",
                status: "ready",
                sentToAdmin: false,
                sentToStudent: false,
                startDate: "2015-01-01",
                endDate: "2017-01-01",
                timeLimit: 0,
                grade: "",
                score: 0,
                showScoreToStudent: true,
                questions: []
            };
        }

        $scope.AddExamsToList = function() {
            var newExam = createDefaultExam();
            newExam.timeLimit = $scope.newQuizTime;
            newExam.subject = $scope.newQuizSubject;
            newExam.name = $scope.newQuizName;
            dataService.addExam(newExam);
        };
        
        $scope.removeQuiz = function(name) {
            dataService.removeExam(name);
        };

        $scope.editExam = function(quiz) {
            $scope.currnetExamForEditing = quiz;
            $scope.editQuestions = $scope.currnetExamForEditing.questions;
        };

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
        };

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
        };


        $scope.SendExam = function(Question) {
            $scope.ExamToSendToAdmin = Question;
            $scope.ExamToSendToAdmin.sentToAdmin = true;
        };
        
        $scope.updateExamsList = function() {
            var number = $scope.exams.indexOf($scope.currnetExamForEditing);
            $scope.exams[number] = $scope.currnetExamForEditing;
        };
    });
} ());
