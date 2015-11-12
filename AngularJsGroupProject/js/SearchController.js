var app = angular.module('appHome');
app.controller("searchController", function ($scope, $state, $stateParams, $http) {
    $scope.show = false;
    var maxResultText = "&maxResults=40";
    function generalSearch(text) {
        $http.get("https://www.googleapis.com/books/v1/volumes?q=" + text + maxResultText)
                        .success(function (newResponse) {
                            $scope.searchResult = newResponse;
                            console.log(newResponse);
                            // display result if the call yields more than 1 result
                            if ($scope.searchResult.totalItems !== 0) {
                                $scope.show = true;
                            } else {
                                $scope.show = false;
                            }
                        }).error(function (newResponse) {
                            alert(newResponse);
                        });
    };

    function fetch() {
        // first check if the search term is an isbn no, then call the specific api with isbn value
        var searchTerm = $scope.searchText;
        var isIsbn = /^\d+$/.test(searchTerm);
        $scope.display = true;

        if (isIsbn) {
            $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchTerm + maxResultText)
            .success(function (response) {
                $scope.searchResult = response;

                // display result if the call yields more than 1 result
                if ($scope.searchResult.totalItems !== 0) {
                    $scope.show = true;
                } else {
                    // if there is no result in response, try general search
                    generalSearch(searchTerm);
                }

            }).error(function (response) {
                alert(response);
            });
        } else {
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
    });