(function() {
    angular.module("indexApp").controller("loginController", function($scope, $http, loginService, dataService) {

        $scope.login = function() {
            if (!$scope.username || !$scope.password) {
                $scope.error = 'Fyll i alla fält!';
            } else {
                var user = dataService.users.find(x => x.username === $scope.username && x.password === $scope.password);
                if (!user) {
                    $scope.error = "Användaren finns inte eller felaktigt lösenord";
                } else {
                    loginService.user = user;
                    location.href = '#/' + user.type;
                }
            }
        };
    });
} ());