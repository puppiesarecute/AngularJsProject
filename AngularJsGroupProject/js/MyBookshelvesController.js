angular.module('appHome').controller('myBookShelvesController', function ($scope, $state, $stateParams) {
    $scope.item = angular.copy($stateParams.bookmarkItem);
    console.log($stateParams.bookmarkItem);
});