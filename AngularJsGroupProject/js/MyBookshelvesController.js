// by Ai Le
angular.module('appHome').controller('myBookShelvesController', ['$scope', '$state', '$stateParams', 'apiService', function ($scope, $state, $stateParams, apiService) {
    $scope.item = angular.copy($stateParams.bookmarkItem);
    
    $scope.saveBookmark = function () {
        $scope.item.date = $scope.date;
        $scope.item.myRating = $scope.myRating;
        $scope.item.note = $scope.note;
        console.log($scope.item);
        //// TODO post item to API
        //apiService.addBookToLibrary($scope.item);
    };
}]);