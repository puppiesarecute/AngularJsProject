var app = angular.module('appHome');
//app.controller("searchController", function ($scope, $state, $stateParams, $http) {
app.controller("searchController", ['$scope', '$state', '$stateParams', 'apiService', function ($scope, $state, $stateParams, apiService) {
    $scope.show = false;
    var maxResultText = "&maxResults=40";
    
    function generalSearch(text) {
        apiService.findBooksGeneral(text).then(
            function (newResponse) {
                $scope.searchResult = newResponse;
                //display result if the call yields more than 1 result
                if ($scope.searchResult.totalItems !== 0) {
                    $scope.show = true;
                } else {
                    $scope.show = false;
                }
            });
    };

    function fetch() {
        // first check if the search term is an isbn no, then call the specific api with isbn value
        var searchTerm = $scope.searchText + maxResultText;
        var isIsbn = /^\d+$/.test($scope.searchText);
        $scope.display = true;

        if (isIsbn) {
            apiService.findBooksByIsbn(searchTerm).then(
                function (response) {
                    $scope.searchResult = response;
                    // display result if the call yields more than 1 result
                    if ($scope.searchResult.totalItems !== 0) {
                        $scope.show = true;
                    } else {
                        // if there is no result in response, try general search
                        generalSearch(searchTerm);
                    }
                });
        }
        else {
            generalSearch(searchTerm);
        }
    };

    // do search when enter
    $scope.submitSearch = function () {
        if ($scope.searchText !== undefined) { //call api and show data
            $scope.show = true;
            fetch();
        } else {
            //$scope.show = false;
        }
    };

    // add to library function
    $scope.addToLibrary = function (item) {
        // TODO call method POST to node api
        //alert("Added to library!");
        console.log(item);
    };

    // pagination
    $scope.totalItems = 40; //since googleapi only allow max 40 results
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 4;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
}]);

//app.directive('starsRating', function () {
//    return {
//        restrict: 'AE',
//        replace: true,
//        scope: {
//            rate: '@rateVal'
//        },
//        link: function (scope, elem, attr) {
//            scope.rateTxt = "width: " + ((scope.rate * 100)/5 + 3) + "%"; // 3 is a magic number used to improve position percentage of the filled stars
//        },
//        templateUrl: '../js/directives/stars.html'
//    }
//});
