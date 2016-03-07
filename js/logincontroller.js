/// <reference path="mainApp.js" />
angular.module(appName).controller('loginController', function ($scope, $http, loginService) {
    $scope.login = function () {
        $http.get('../data/users.json').success(function (response) {
            var user = response.users.find(user => user.username === $scope.username && user.password === $scope.password);

            if (user) {
                $scope.loginError = '';
                loginService.username = user.username;
                loginService.password = user.password;
                location.href = '#/' + pages.find(page => page === user.type);
            } else {
                $scope.loginError = 'No such user account!';
            }
        });
    };
});
