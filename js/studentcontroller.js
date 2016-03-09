/// <reference path="app.js" />
(function() {
	angular.module("indexApp").controller("studentController", function($scope, $http, $interval) {
		
		/*
		Would be great to be able to separate users and questionnaire data
		*/
		
		$http.get('../data/students.json').success(function (response) {
			$scope.user = response.students.find(item => item.username === "Sune");
		});

		$scope.questionType = function (type) {
			return type === "SingleChoice" ? "radio" : "checkbox";
		};

		$scope.examStatus = function (status) {
			return status === "ready" ? "Starta" : "Fortsätt";
		}
		
		$scope.startTest = function(){
			$scope.currentDate = new Date();
			$("#btn-submit").show(); //to make sure
			
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
		};
		
		$scope.submit = function() {
			var htmlAnswers = document.getElementsByClassName("answer-alternative");
			var jsonAnswers = [];
			var points = 0;
			//var totalPoints = 0;
			
			for(var i = 0; i < $scope.questions.length; i++){
				for(var j = 0; j < $scope.questions[i].answers.length; j++){
					jsonAnswers.push($scope.questions[i].answers[j]);
				}
			}
			
			for(var j = 0; j < htmlAnswers.length; j++){

				//var allCorrect = false;
				var currentQuestionBox = $(htmlAnswers[j]).parent().parent();

				/*if added in case we want other kinds of answer alternatives*/
				if(htmlAnswers[j].type==="radio" || htmlAnswers[j].type==="checkbox"){

					if(htmlAnswers[j].checked && (jsonAnswers[j].points > 0)){
						$(htmlAnswers[j]).parent().css("background-color", "green");
						points += jsonAnswers[j].points;
						//allCorrect = true;
					}
					else if((htmlAnswers[j].checked && (jsonAnswers[j].points < 0)) || 
							(!htmlAnswers[j].checked && (jsonAnswers[j].points > 0))){
						
						if(jsonAnswers[j].points<0){
							points += jsonAnswers[j].points;	
						}
						else{
							points -= jsonAnswers[j].points;
						}
						
						if(htmlAnswers[j].checked && (jsonAnswers[j].points < 0)){
							$(htmlAnswers[j]).parent().css("background-color", "red");
						}
						else if(!htmlAnswers[j].checked && (jsonAnswers[j].points > 0)){
							$(htmlAnswers[j]).parent().css("background-color", "yellow");
						}
					}
				}
				
				//$(currentQuestionBox).css("background-color", allCorrect ? "green" : "gray");
				
				/*
				$scope.$watch("currentQuestionBox", function(){
					if(points<0)
						points=0;
					
					totalPoints += points;
				});*/
			}
			$scope.totalPoints = points;
			$("#btn-submit").hide();
			//här hade vi sparat resultatet i en databas och tickat det här inlägget som "done"
		};
    });    
}());
