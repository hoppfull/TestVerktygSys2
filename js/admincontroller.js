(function() {   
    angular.module("indexApp").controller("adminController", function($scope, $http, dataService, $window, $location) {

        /* Example: using dataService: */
        // get all teachers:
        $http.get('../data/admins.json').success(function(response) {
            $scope.admins = response.admins;

        });
        $http.get('../data/users.json').success(function(response) {
            $scope.users = response.users;
            $scope.tests = response.TEST;

        })
        $http.get('../data/questioner.json').success(function(response) {
            $scope.questions = response.questions;

        });

        $scope.sendTest = function() {
            $window.alert("Proven är skickade");
        };

        $scope.removeRow = function(testIndex) {
            $scope.tests.splice(testIndex, 1);
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
        $scope.questionType = function(type) {
            return type === "SingleChoice" ? "radio" : "checkbox";
        };            
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[0];
 
 
    });
  

} ());

 
 
