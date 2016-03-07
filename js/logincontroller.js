/// <reference path="mainApp.js" />
angular.module(appName).controller('loginController', function ($scope, $http, loginService, $q) {
    $scope.login = function () {
        var users = ['admins', 'students', 'teachers'];
        var queries = users.map(user => $http.get('../data/' + user + '.json'));

        $q.all(queries).then(function (responses) {
            var responseData = responses.map(response => response.data);
            var usersData = users.map(user => responseData.find(x => x[user]));

            function f(ls, pagename) {
                var user = ls.find(l => l.username === $scope.username && l.password === $scope.password);
                if (user) {
                    $scope.loginError = '';
                    loginService.user = user;
                    location.href = '#/' + pagename;
                    return true;
                } else {
                    $scope.loginError = 'No such user account!';
                    return false;
                }
            }
            f(usersData.find(u => u.admins).admins, 'admin');
            f(usersData.find(u => u.teachers).teachers, 'teacher');
            f(usersData.find(u => u.students).students, 'student');
        });
    };
});
/* Tjenare grabbar! Denna kod är anpassad till datastrukturen vi bestämde oss för
och fungerar men är lite rörig och svår att ändra på. Jag föreslår en ny datastruktur
i 'data/users.json' och interaktion med den i 'logincontroller2.js'.
*/