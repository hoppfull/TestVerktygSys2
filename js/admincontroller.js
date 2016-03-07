(function() {
    angular.module("indexApp").controller("adminController", function($scope, $http) {
        $http.get('../data/admins.json').success(function(response) {
            $scope.admins = response.admins;
        });   
    });
}());