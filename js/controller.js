/// <reference path="app.js" />
(function() {
    angular.module("indexApp").controller("MainController", function($scope, $http) {
        $http.get('data/data.json').success(function(response) {
            $scope.questions = response;
            $scope.time = response.time;
        });
    });
}());