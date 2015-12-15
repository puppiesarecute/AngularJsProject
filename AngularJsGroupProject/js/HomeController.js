// by AI Le
angular.module('appHome').controller("homeController",
    ['$scope', '$state', '$stateParams', 'apiService', function ($scope, $state, $stateParams, apiService) {

    //TODO get test data, should later be replaced by apiService.getMyLibrary()
    //apiService.getMyLibraryTest().then(
    //        function (response) {
    //            $scope.allItems = response;
    //        });

     
    apiService.getMyLibrary().then(
            function (response) {
                var books = [];
                for (var i = 0; i < response.length; i++) {
                    var img = { img: "" };
                    $.extend(response[i], img);
                    books.push(response[i]);
                }
                $scope.allItems = books;
            });

        

    $scope.editBookmark = function (item) {
        //alert(item.volumeInfo.title);
        $state.go("myBookshelves", { bookmarkItem: item });
        //console.log(item);
    }
}]);
