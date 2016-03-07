/// <reference path="mainApp.js" />
angular.module(appName).controller('teacherController', function($scope, loginService) {
    $scope.greetingMsg = loginService.username;
});