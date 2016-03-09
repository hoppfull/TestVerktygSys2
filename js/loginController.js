(function() {
    angular.module("indexApp").controller("loginController", function($scope, $http) {
        $http.get('../data/users_TEMP.json').success(function(response) {
            var users = response.users;

            $scope.login = function() {
                var uname = $scope.username;
                var pword = $scope.password;
                if (uname == null || pword == null) {
                    $scope.error = "Fyll i saker";
                }

            };
        });


    });
} ());