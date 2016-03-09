(function() {
    angular.module("indexApp").controller("adminController", function($scope, $http, dataService, $window) {
        /* Example: using dataService: */
        // get all teachers:
        $http.get('../data/admins.json').success(function(response) {
            $scope.admins = response.admins;

        });
        $http.get('../data/users.json').success(function(response) {
            $scope.users = response.users;
        })

        $scope.sendTest = function() {
            $window.alert("Proven är skickade");
        };



        $scope.addUser = function() {
            $scope.users.push({
                occupation: $scope._occupation,
                firstName: $scope._firstName,
                lastName: $scope._lastName,
                username: $scope._userName,
                password: $scope._password
            });
            $scope._occupation = "";
            $scope._firstName = "";
            $scope._lastName = "";
            $scope._userName = "";
            $scope._password = "";
        };


    });
} ());