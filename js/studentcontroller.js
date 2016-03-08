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
    angular.module("indexApp").controller('timeController',function($scope, $interval){
        $scope.startTime = new Date().toLocaleTimeString();
        $scope.timeLeft = 10;
        
        $interval(function(){
            if($scope.timeLeft>0){
                $scope.timeLeft-=1;
            }else{
                $scope.timeLeft="You gonna die!!!";
            }
        },1000);            
    });    
}());

