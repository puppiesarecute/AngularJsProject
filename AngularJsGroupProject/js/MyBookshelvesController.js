// by Ai Le
angular.module('appHome').controller('myBookShelvesController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    $scope.item = angular.copy($stateParams.bookmarkItem);
    console.log($stateParams.bookmarkItem);
}]);