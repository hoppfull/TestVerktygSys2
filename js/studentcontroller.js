/// <reference path="app.js" />
(function() {
	angular.module("indexApp").controller("studentController", function($scope, $http, $interval, dataService, loginService) {
		var timer = null;
		$scope.student = dataService.getUsers()
			.find(item => item.username === "student");
		$scope.exams = dataService.getExams()
			.filter(item => item.studentName === "student")
			.filter(item => item.sentToStudent);
		
		console.log($scope.student);
		console.log($scope.exams);
		
		$scope.studentLogout = function(){
			loginService.logout();
		}
		
		$scope.btnExamStatus = function (status) {
			return status === "ready" ? "Starta" : "Fortsätt";
		}
		
		$scope.startExam = function(exam){
			$scope.isExamDone = false;
			setActiveExam(exam);
			startCountdown($scope.activeExam.timeLimit);
		};
		
		$scope.questionType = function (type) {
			return type !== "ranked" ? type : "combobox";
		};
		
		var setActiveExam = function(exam){
			$scope.activeExam = exam;
			$scope.questions = $scope.activeExam.questions;
			$scope.examTitle = $scope.activeExam.name;
		}
		
		//TIMER
		var startCountdown = function(timeLimit){
			$scope.time = timeLimit;
			timer = $interval(decrementTime, 1000, timeLimit+1);
		}

		var decrementTime = function(){
			if($scope.time>0){
				$scope.time-=1;
			}
			else{
				$scope.time = "Time out";
				$scope.submit();	
			}
		};
		
		$scope.submit = function() {
			var htmlAnswers = document.getElementsByClassName("answer-alternative");
			$interval.cancel(timer);
			$scope.activeExam.status = "done";
			updateExam(htmlAnswers);
			setGrade();
			$scope.activeExam = null;
		}
		
		var updateExam = function(htmlAnswers){
			var answerIndex = 0;
			var htmlAnswerBox = null;
			$scope.maxPoints = 0;
			
			for(var i = 0; i<$scope.activeExam.questions.length; i++){
				var points = 0;
				var questionPointsMax = 0;
				for(var j = 0; j<$scope.activeExam.questions[i].answers.length; j++){
					var question = $scope.activeExam.questions[i];
					var jsonAnswer = $scope.activeExam.questions[i].answers[j];
					var htmlAnswer = htmlAnswers[answerIndex];
					htmlAnswerBox = $(htmlAnswer).parent().parent().parent();
					
					saveAnswer(question, jsonAnswer, htmlAnswer);//check - done
					points += correctQuestion(question, jsonAnswer, htmlAnswer);//check
					$scope.maxPoints += (jsonAnswer.point > 0) ? 1 : 0;
					questionPointsMax += (jsonAnswer.point > 0) ? 1 : 0;
					answerIndex++;
				}
				saveScores($scope.activeExam, $scope.activeExam.questions[i], points);
				if(questionPointsMax === $scope.activeExam.questions[i].score){
					$(htmlAnswerBox).css("background-color", "green");
				}
			}
			$scope.totalPoints = $scope.activeExam.score;
		}
		
		var saveAnswer = function(question, jsonAnswer, htmlAnswer){
			//add case for ranked if time
			if(question.type==="radio" || question.type==="checkbox"){
				jsonAnswer.checked = htmlAnswer.checked ? true : false;
			}
			else if(question.type==="ranked"){
				jsonAnswer.rank = htmlAnswer.value;
			}
		}

		var correctQuestion = function(question, jsonAnswer, htmlAnswer){
			//add case for ranked if time
			if(question.type==="radio" || question.type==="checkbox"){
				if(jsonAnswer.checked && (jsonAnswer.point > 0)){
					$(htmlAnswer).parent().css("background-color", "green");
					return jsonAnswer.point;
				}
				else if(jsonAnswer.checked && (jsonAnswer.point < 0)){
					$(htmlAnswer).parent().css("background-color", "red");
					return jsonAnswer.point;
				}
				else if(!jsonAnswer.checked && (jsonAnswer.point > 0)){
					$(htmlAnswer).parent().css("background-color", "yellow");
					return -1;
				}
				return 0;
			}
			else if(question.type==="ranked"){
				if(jsonAnswer.rank == jsonAnswer.point){
					$(htmlAnswer).parent().css("background-color", "green");
					return 1;
				}
				else{
					$(htmlAnswer).parent().css("background-color", "red");
					return -1;
				}
				return 0;
			}
			return 0;
		}
		
		var saveScores = function(exam, question, points){
			exam.score += points > 0 ? points : 0;
			question.score = points > 0 ? points : 0;
		}
		
		var setGrade = function(){
			var percentage = ($scope.totalPoints/$scope.maxPoints);
			
			if(percentage >= 0.8){
				$scope.activeExam.grade = "VG";
				return;
			}
			else if(percentage >= 0.6){
				$scope.activeExam.grade = "G";
			}
			else{
				$scope.activeExam.grade = "U";
			}
		}
    });    
}());