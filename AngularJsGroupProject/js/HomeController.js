angular.module('appHome').controller("homeController", ['$scope', '$state', '$stateParams', 'apiService', function ($scope, $state, $stateParams, apiService) {

    //TODO get test data, should later be replaced by apiService.getMyLibrary()
    apiService.getMyLibraryTest().then(
            function (response) {
                $scope.allItems = response;
            });

    $scope.editBookmark = function (item) {
        //alert(item.volumeInfo.title);
        $state.go("myBookshelves", { bookmarkItem: item });
        //console.log(item);
    }
}]);
