/// <reference path="mainApp.js" />
angular.module(appName).controller('teacherController', function($scope, $http, loginService) {
    $scope.username = loginService.user.username;
    $scope.logout = loginService.logout;
});