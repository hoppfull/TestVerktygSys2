(function() {
    var myCtrl = angular.module("indexApp").controller("MainController", function($scope, $http) {

        $scope.questions = 3; //temp
        
        $http.get('data/data.json').success(function(data) {
            $scope.artists = data.artists;
        });
        
        $scope.left = function(){
            return $scope.questions - 1;
        }
    });
}());