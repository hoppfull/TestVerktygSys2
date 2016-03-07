/// <reference path="mainApp.js" />
angular.module(appName).controller('loginController', function ($scope, $http, loginService) {
    $scope.login = function () {
        $http.get('../data/users.json').success(function (response) {
            var user = response.users.find(user => user.username === $scope.username && user.password === $scope.password);

            if (user) {
                $scope.loginError = '';
                loginService.user = user;
                location.href = '#/' + pages.find(page => page === user.type);
            } else {
                $scope.loginError = 'No such user account!';
            }
        });
    };
});
/* Tjenare grabbar! Detta är ett alternativ till logincontroller.js
Mycket enklare kod och logik. Mer utökningsbar osv... Detta kräver dock en enklare
datastruktur för att fungera. (Se 'data/users.json')
*/