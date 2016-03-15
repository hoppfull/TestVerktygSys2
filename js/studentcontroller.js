/// <reference path="app.js" />
(function() {
	angular.module("indexApp").controller("studentController", function($scope, $http, $interval, dataService, loginService) {
		var timer;
		var showScoreToStudent = true;
		$scope.examIsDone = false;
		$scope.student = loginService.getUser();
		$scope.exams = dataService.getExams()
			.filter(exam => exam.studentName === loginService.getUser().username && exam.sentToStudent);
		
		console.log($scope.student);
		console.log($scope.exams);
		
		$scope.studentLogout = function(){
			loginService.logout();
		}
		
		$scope.btnExamStatus = function (status) {
			return status === "ready" ? "Starta" : "Fortsätt";
		}
		
		$scope.setActiveExam = function(exam){
			$scope.activeExam = exam;
			$scope.questions = $scope.activeExam.questions;
			getMaxScore();
			$scope.totalPoints = $scope.activeExam.score;
			$scope.examTitle = $scope.activeExam.name;
			showScoreToStudent = $scope.activeExam.showScoreToStudent;
		}
		
		$scope.startExam = function(exam){
			$scope.setActiveExam(exam);
			countdownTimer();
		};
		
		var countdownTimer = function(){
			timer = $interval(function(){
				if($scope.activeExam.timeLimit>0){
					$scope.activeExam.timeLimit--;
					$scope.time = $scope.activeExam.timeLimit;
				}
				else{
					$scope.time = "Time out";
					$scope.submit();
				}
			}, 1000, $scope.activeExam.timeLimit+1);
		}
		
		$scope.submit = function() {
			var htmlAnswers = document.getElementsByClassName("answer-alternative");
			$scope.activeExam.status = "done";
			$scope.examIsDone = true;
			$interval.cancel(timer);
			updateExam(htmlAnswers);
			saveGrade();
			$scope.activeExam = null;
		}
		
		var getMaxScore = function(){
			$scope.maxPoints = 0;
			for(var i = 0; i<$scope.activeExam.questions.length; i++){
				for(var j = 0; j<$scope.activeExam.questions[i].answers.length; j++){
					var jsonAnswer = $scope.activeExam.questions[i].answers[j];
					$scope.maxPoints += (jsonAnswer.point > 0) ? 1 : 0;
				}
			}
		}
		
		$scope.getQuestionScore = function(questionScore){
			if(showScoreToStudent){
				return "Poäng: " + questionScore;
			}
		}
		
		$scope.getExamScore = function(){
			if(showScoreToStudent){
				var totalPoints = $scope.totalPoints;
				var maxPoints = $scope.maxPoints;
				var percentage = ((totalPoints/maxPoints)*100).toFixed(2);
				
				return "Poäng: " + totalPoints + "/" + maxPoints + " (" + percentage + "%)";
			}
		}
		
		//Looks horrible but works
		var updateExam = function(htmlAnswers){
			var answerIndex = 0;
			var htmlAnswerBox = null;
			
			
			for(var i = 0; i<$scope.activeExam.questions.length; i++){
				var points = 0;
				var questionPointsMax = 0;
				for(var j = 0; j<$scope.activeExam.questions[i].answers.length; j++){
					var question = $scope.activeExam.questions[i];
					var jsonAnswer = $scope.activeExam.questions[i].answers[j];
					var htmlAnswer = htmlAnswers[answerIndex];
					htmlAnswerBox = $(htmlAnswer).parent().parent();
					
					saveAnswer(question, jsonAnswer, htmlAnswer);
					points += getPoints(question, jsonAnswer, htmlAnswer);
					//$scope.maxPoints += (jsonAnswer.point > 0) ? 1 : 0;
					questionPointsMax += (jsonAnswer.point > 0) ? 1 : 0;
					answerIndex++;
				}
				saveScores($scope.activeExam, $scope.activeExam.questions[i], points);
				if(questionPointsMax === $scope.activeExam.questions[i].score){
					setContainerColor(htmlAnswer, ".question-box", "background-color", "green");
				}
			}
			$scope.totalPoints = $scope.activeExam.score;
		}
		
		var saveAnswer = function(question, jsonAnswer, htmlAnswer){
			if(question.type==="radio" || question.type==="checkbox"){
				jsonAnswer.checked = htmlAnswer.checked ? true : false;
			}
			else if(question.type==="ranked"){
				jsonAnswer.rank = htmlAnswer.value;
			}
		}

		var getPoints = function(question, jsonAnswer, htmlAnswer){
			var boxColor = null;
			var point = 0;
			
			if(question.type==="radio" || question.type==="checkbox"){
				if(jsonAnswer.checked){
					boxColor = jsonAnswer.point > 0 ? "green" : "red";
					point = jsonAnswer.point;
				}
				else{
					if(jsonAnswer.point > 0){
						point = -1;
						boxColor = "yellow";
					}
				}
			}
			else if(question.type==="ranked"){
				point = jsonAnswer.rank == jsonAnswer.point ? 1 : -1;
				boxColor = jsonAnswer.rank == jsonAnswer.point ? "green" : "red";
			}
			setContainerColor(htmlAnswer, ".answer-box", "background-color", boxColor);
			return point;
		}
		
		var setContainerColor = function(htmlOrigin, searchItem, valueToColor, color){
			if($scope.activeExam.showScoreToStudent){
				$( htmlOrigin )
					.closest( searchItem ) //searches upwards DOM tree 
					.css( valueToColor, color );	
			}
		}
		
		var saveScores = function(exam, question, points){
			exam.score += points > 0 ? points : 0;
			question.score = points > 0 ? points : 0;
		}
		
		var saveGrade = function(){
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