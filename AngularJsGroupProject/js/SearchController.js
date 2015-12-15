//by Ai Le & Dana
var app = angular.module('appHome');
app.controller("searchController", ['$scope', '$state', '$stateParams', '$http', 'apiService',
    function ($scope, $state, $stateParams, $http, apiService) {
    $scope.show = false;
    var maxResultText = "&maxResults=40";
    
    function generalSearch(text) {
        //calling the apiService
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
        var book = {
            title: item.volumeInfo.title,
            isbn_10: item.volumeInfo.industryIdentifiers[0].identifier,
            isbn_13: item.volumeInfo.industryIdentifiers[1].identifier,
            subtitle: item.volumeInfo.subtitle,
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            pageCount: item.volumeInfo.pageCount,
            averageRating: item.volumeInfo.averageRating,
            finishedDate: "",
            personalRate: 0,
            notes: "",
            authors: item.volumeInfo.authors,
            categories: item.volumeInfo.categories,
            price: 250,
            img: item.volumeInfo.imageLinks.thumbnail,
            quantity: 1
            
        };
        console.log("adding = "+ JSON.stringify(book));
        $http.post("http://bindersystem.azurewebsites.net/api/books/", book).success(function(book, status) {
        $scope.hello = book;
        });
        $state.go("home");
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

