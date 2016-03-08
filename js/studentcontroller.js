/// <reference path="app.js" />
(function() {
    angular.module("indexApp").controller("studentController", function($scope, $http, $interval) {
        $http.get('../data/questioner.json').success(function(response) {
            $scope.questions = response.questions;
            $scope.time = response.time;
            
            
            $scope.startTime = new Date().toLocaleTimeString();      
            $scope.timeController= function(){
                 $interval(function(){
                    if($scope.time>0){
                        $scope.time-=1;
                    }else{
                        $scope.time ="Time out";
                    }
                },1000) 
            }
        });
        
        $scope.questionType = function(type){
            return type =="SingleChoice"?"radio":"checkbox";
        };
        
    });    
}());
