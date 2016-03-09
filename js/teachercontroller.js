(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, $location) {
        var students = dataService.users.filter(user => user.type === "student");
        $scope.students = students;
        $scope.exams = students.exam;
        
        
        
    });
}());
