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
            scope.rateTxt = "width: " + ((scope.rate * 100) / 5) + "%"; // 3 is a magic number used to improve position percentage of the filled stars
        },
        templateUrl: '../js/directives/stars.html'
    }
});