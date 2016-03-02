/// <reference path="app.js" />
indexApp.controller("MainController", ['$scope', '$http', function($scope, $http) {
    $http.get('data/data.json').success(function(response) {
        $scope.questions = response.data.questions;
        $scope.time = response.data.time;
    });
}]);
