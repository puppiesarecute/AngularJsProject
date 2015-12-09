//by Ai Le
var app = angular.module('appHome');
app.directive('starsRating', function () {
    return {
        restrict: 'AE',
        replace: false,
        scope: {
            rate: '@rateVal'
        },
        link: function (scope, elem, attr) {
            scope.rateTxt = "width: " + scope.rate * 100 / 5 + "%"; 
        },
        templateUrl: '../js/directives/stars.html'
    };
});