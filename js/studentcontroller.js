/// <reference path="app.js" />
(function() {
    angular.module("indexApp").controller("studentController", function($scope, $http) {
        $http.get('../data/questioner.json').success(function(response) {
            $scope.questions = response.questions;
            $scope.time = response.time;
        });
        
        $scope.questionType = function(type){
            return type=="SingleChoice"?"radio":"checkbox";
        }
        
    });
    angular.module("indexApp").controller('timeController',function($scope, $timeout,$interval){
        $scope.startTime = new Date().toLocaleTimeString();
        $scope.timeLeft = 60;
        $timeout(function(){
            $interval(function(){
                $scope.timeLeft -=1;
            },1000)
            $scope.timeLeft="You gonna die!!!"
        },60000)
    })
}());

