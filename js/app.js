(function() {
    var indexApp = angular.module("indexApp", [ngRoute]);
    indexApp.config(function($routeProvider){
        $routeProvider
        .when('/',{            
            templateUrl:'index.html'
        })
        .when('/student',{
            templateUrl:'html/student'
        })
        .when('/teacher',{
            templateUrl:'html/teacher'
        })
        .when('/admin',{
            templateUrl:'html/admin'
        })
        .otherwise({
            redirectTo:'/login'
        }) 
    })    
}());