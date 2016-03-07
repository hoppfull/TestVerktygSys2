/// <reference path="mainApp.js" />
angular.module(appName).controller('adminController', function ($scope, $http, loginService) {
    $scope.username = loginService.username;
    $scope.logout = loginService.logout;
});