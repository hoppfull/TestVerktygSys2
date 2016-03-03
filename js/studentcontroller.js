/// <reference path="app.js" />
(function() {
    angular.module("indexApp").controller("MainController", function($scope, $http) {
        $http.get('data/questioner.json').success(function(response) {
            $scope.questions = response.questions;
            $scope.time = response.time;
        });
        
        $scope.questionType = function(type){
            return type=="SingleChoice" ? "radio" : "checkbox";
        }
    });
}());