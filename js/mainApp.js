(function () { // Author: Bjorn
    var mainApp = angular.module(appName, ['ngRoute']);

    mainApp.controller('mainController', function ($scope) {
    });

    mainApp.service('loginService', function () {
        var user = null;

        var logout = function () {
            user = null;
            location.href = '#/';
        };
        return {
            user: user,
            logout: logout
        };
    });

    mainApp.config(function ($routeProvider) {
        pages.forEach(function (page) {
            $routeProvider.when('/' + page, {
                templateUrl: 'html/' + page + '.html',
                controller: page + 'Controller'
            });
        });
        $routeProvider.otherwise({ redirectTo: '/login' });
    });
})();
