(function() {
    angular.module("indexApp").controller("adminController", function($scope, $http, dataService, $window) {
        /* Example: using dataService: */
        // get all teachers:
        var teachers = dataService.users.filter(user => user.type === "teacher");
        var SnowWhite = dataService.users.find(user => user.username === "Snow White");
        console.log(teachers);
        console.log(SnowWhite);
        
        $http.get('../data/admins.json').success(function(response) {
            $scope.admins = response.admins;
           
        });   
        $http.get('../data/users.json').success(function(response) {
            $scope.users = response.users;
        })
        
        $scope.sendTest = function() {
        $window.alert("Proven är skickade");
      };
    });
}());