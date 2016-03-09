(function() {
    angular.module("indexApp").controller("teacherController", function($scope, dataService, $location) {
        var students = dataService.users.filter(user => user.type === "student");
        
        var x = [];
        for (var i = 0; i < students.length; i++) {
            for (var j = 0; j < students[i].exam.length; j++) {
                x.push({
                    username: students[i].username,
                    examName: students[i].exam[j].name,
                    availableFrom: students[i].exam[j].availableFrom,
                    availableUntil: students[i].exam[j].availableUntil
                });
            }
        }
        console.log(x);
        $scope.p = x;
        
    });
}());
