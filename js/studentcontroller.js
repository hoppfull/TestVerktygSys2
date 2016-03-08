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
			
			for(var i = 0; i < $scope.questions.length; i++){
				for(var j = 0; j < $scope.questions[i].answers.length; j++){
					jsonAnswers.push($scope.questions[i].answers[j]);
				}
			}
			
			for(var i = 0; i < htmlAnswers.length; i++){
				
				/*if added in case we want other kinds of answer alternatives*/
				if(htmlAnswers[i].type==="radio" || htmlAnswers[i].type==="checkbox"){
					
					if(htmlAnswers[i].checked && (jsonAnswers[i].points > 0)){

						//alert("right");
						htmlAnswers[i].style.color = "green";
					}
					else if((htmlAnswers[i].checked && (jsonAnswers[i].points < 0)) ||
							(!htmlAnswers[i].checked && (jsonAnswers[i].points > 0))){

						//alert("wront");
						htmlAnswers[i].style.color = "red";
						//htmlAnswers[i].css("background-color", "red");
					}
				}
			}
			
			//alert($scope.questions.length);
			
		};
    });    
}());
