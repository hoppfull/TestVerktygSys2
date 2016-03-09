/// <reference path="app.js" />
(function() {
	angular.module("indexApp").controller("studentController", function($scope, $http, $interval) {
		
		/*
		Would be great to be able to separate users and questionnaire data
		--Eric
		*/
		
		/*
		TIMER
		*/
		var decrementTime = function(){
			if($scope.time>0){
				$scope.time-=1;
			}
			else{
				$scope.time ="Time out";
				$scope.submit();
			}
		};
		
		var startCountdown = function(){
			$interval(decrementTime, 1000, $scope.time+1);
		}
		
		var loadJson = function(array){
			for(var i = 0; i < $scope.questions.length; i++){
				for(var j = 0; j < $scope.questions[i].answers.length; j++){
					array.push($scope.questions[i].answers[j]);
				}
			}
		}
		
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
				startCountdown();
			});
		};
		
		$scope.submit = function() {
			var htmlAnswers = document.getElementsByClassName("answer-alternative");
			var jsonAnswers = [];
			var currentQuestionIndex = -1;
			var currentQuestionBox = null;
			var points = 0;
			var allCorrect = false;
			$scope.totalPoints = 0;
			loadJson(jsonAnswers); //load questions to check against
			
			//check if correct answers
			for(var j = 0; j < htmlAnswers.length; j++){
				
				//check if new question
				if(currentQuestionIndex != $(htmlAnswers[j]).attr("name")){
					//..and reset values
					currentQuestionIndex = $(htmlAnswers[j]).attr("name");
					currentQuestionBox = $(htmlAnswers[j]).parent().parent();
					var allCorrect = true;
				}
				
				/*
				checks correect answers and applies confirmation css
				if statements added in case we want other kinds of answer alternatives
				*/
				if(htmlAnswers[j].type==="radio" || htmlAnswers[j].type==="checkbox"){

					if(htmlAnswers[j].checked && (jsonAnswers[j].points > 0)){
						$(htmlAnswers[j]).parent().css("background-color", "green");
						points += jsonAnswers[j].points;
					}
					else if((htmlAnswers[j].checked && (jsonAnswers[j].points < 0)) || 
							(!htmlAnswers[j].checked && (jsonAnswers[j].points > 0))){
						
						points--;
						allCorrect = false;
						
						if(htmlAnswers[j].checked && (jsonAnswers[j].points < 0)){
							$(htmlAnswers[j]).parent().css("background-color", "red");
						}
						else if(!htmlAnswers[j].checked && (jsonAnswers[j].points > 0)){
							$(htmlAnswers[j]).parent().css("background-color", "yellow");
						}
					}
				}
				
				//save values, must check one value in the future thus the cehck
				if(htmlAnswers.length >= j+1){
					
					//save values, but ignore if the default start vallue
					if(currentQuestionIndex != $(htmlAnswers[j+1]).attr("name") && currentQuestionIndex != -1){
						
						//set container css
						$(currentQuestionBox).css("background-color", allCorrect ? "green" : "gray");
						
						//set points
						if(points<0)
							points=0;

						$scope.totalPoints += points;
					}
				}
			}
			$("#btn-submit").hide();
			//här hade vi sparat resultatet i en databas och tickat det här inlägget som "done"
			
			
		};
    });    
}());