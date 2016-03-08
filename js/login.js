(function(){
    angular.module('indexApp').controller('loginController', function($scope, $location){
        $scope.login = function(){
            var uname = $scope.username;
            var password = $scope.password;
            if(uname =='admin' && password =='admin'){
                $location.path('/html/student.html')
            }
        }
    })
})