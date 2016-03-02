(function() {
    var myCtrl = angular.module("indexApp").controller('timecontroller',function($scope,$interval){
    $scope.theTimeStart = new Date().toLocaleTimeString();
    $scope.testTimeLeft = 60;    
    $interval(function(){
        if($scope.testTimeLeft >0)
        $scope.testTimeLeft = $scope.testTimeLeft - 1;
    },1000);
});
}());