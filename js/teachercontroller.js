(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, $location) {
        /*var students = dataService.users.filter(user => user.type === "student");

        var x = [];
        students.forEach(student => student.exam.forEach(exam => x.push({
            username: student.username,
            examName: exam.name,
            availableFrom: exam.availableFrom,
            availableUntil: exam.availableUntil
        })));

        $scope.p = x; */
        
        $scope.quizzes = dataService.quizzes;
        var deletebutton = function(x) {

        }
    });
} ());
