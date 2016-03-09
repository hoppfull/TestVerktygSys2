(function() {
    angular.module("indexApp").controller("adminController", function($scope, $http, dataService, $window) {
        /* Example: using dataService: */
        // get all teachers:
        $http.get('../data/admins.json').success(function(response) {
            $scope.admins = response.admins;
           
        });   
        $http.get('../data/users.json').success(function(response) {
            $scope.users = response.users;
            $scope.tests = response.TEST;
            
        })
        
        $scope.sendTest = function() {
        $window.alert("Proven är skickade");
      };
$scope.removeRow = function (testIndex) {
    $scope.tests.splice(testIndex, 1);
}


    });
}());