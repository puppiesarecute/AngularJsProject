// by Dana
angular.module('appHome').controller('myBookShelvesController',
    ['$scope', '$state', '$stateParams', '$http',
        function ($scope, $state, $stateParams, $http) {
    $scope.item = angular.copy($stateParams.bookmarkItem);
    
    $scope.saveBookmark = function () {
        $scope.item.finishedDate = $scope.date;
        $scope.item.personalRate = $scope.rating;
        $scope.item.notes = $scope.note;
        //console.log($scope.item);

        $http.put('http://bindersystem.azurewebsites.net/api/books/' + $scope.item._id, $scope.item)
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
                //console.log("Am updatat");
                //console.log(data);
                //console.log(status);
                //console.log(headers);
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
        $state.go("home");
    };
}]);