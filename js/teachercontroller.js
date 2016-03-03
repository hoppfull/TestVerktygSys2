(function() {
    angular.module("indexApp").controller("teacherController", function($scope, $http) {
        $http.get('../data/teacher.json').success(function(response) {
            $scope.teachers = response.teachers;

        });
            
    });
}());
