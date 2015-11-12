angular.module('appHome').controller("homeController", function ($scope, $state, $stateParams, $http) {

    //get test data, should later be replaced by api call to Node project to get all Library objects
    $http.get("https://www.googleapis.com/books/v1/volumes?q=a%20song%20ice%20fire&maxResults=7")
                        .success(function (newResponse) {
                            $scope.testItems = newResponse;
                        }).error(function (newResponse) {
                            alert(newResponse);
                        });
});
