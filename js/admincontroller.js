(function() {
    angular.module("indexApp").controller("adminController", function($scope, dataService, loginService) {
        $scope.name = loginService.getUser().firstName + ' ' + loginService.getUser().lastName;
        $scope.logout = function() {
            loginService.logout();
        };

        function updateLists() {
            $scope.exams = dataService.getExams().filter(exam => exam.sentToAdmin && !exam.sentToStudent);
            console.log($scope.exams.find(exam => exam.name === 'as').timeLimit);
            $scope.students = dataService.getUsers().filter(user => user.type === 'student');
            $scope.admins = dataService.getUsers().filter(user => user.type === 'admin');
            $scope.teachers = dataService.getUsers()
                .filter(user => user.type === 'teacher')
                .map(user => ({
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    //subjects: user.subjects.length === 0 ? "" : user.subjects.reduce((a, b) => a + ', ' + b)
                }));
        }

        updateLists();

        $scope.closeTabs = function() {
            $scope.showStudents = false;
            $scope.showTeachers = false;
            $scope.showAdmins = false;
        };

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
            } else {
                alert("Användarnamn finns redan!");
            }
        };

        $scope.showExam = function(exam) {
            $scope.examToShow = exam;
        };

        $scope.removeExam = function(examName) {
            dataService.removeExam(examName);
            updateLists();
        };
        $scope.examToSend;
        $scope.openSendExamForm = function(exam) { // TODO: implement or remove
            $scope.examToSend = exam;
        };

        $scope.sendExamToStudents = function() { // TODO: implement or remove
            console.log($scope.examToSend);
            dataService.getUsers()
                .filter(user => user.type === 'student')
                .forEach(user => {
                    dataService.addExam({
                        name: $scope.examToSend.name,
                        subject: $scope.examToSend.name,
                        authorName: $scope.examToSend.authorName,
                        studentName: user.username,
                        status: "ready",
                        sentToAdmin: $scope.examToSend.sentToAdmin,
                        sentToStudent: true,
                        startDate: "2014-01-23",
                        endDate: "2017-02-04",
                        timeLimit: $scope.examToSend.timeLimit,
                        grade: $scope.examToSend.grade,
                        score: $scope.examToSend.score,
                        showScoreToStudent: $scope.examToSend.showScoreToStudent,
                        questions: $scope.examToSend.questions.map(question => ({
                            text: question.text,
                            type: question.type,
                            score: question.score,
                            answers: question.answers.map(answer => ({
                                text: answer.text,
                                point: answer.point,
                                checked: answer.checked,
                                rank: answer.rank
                            }))
                        }))
                    });
                });
            $("[data-dismiss=modal]").trigger({ type: "click" });
        };
    });
} ());