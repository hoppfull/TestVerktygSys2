(function () { // Author: Bjorn
    var mainApp = angular.module(appName, ['ngRoute']);

    mainApp.controller('mainController', function ($scope) {

    });
    
    mainApp.service('loginService', function() {
        var username;
        var password;
        return {
            username: username,
            password: password
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
