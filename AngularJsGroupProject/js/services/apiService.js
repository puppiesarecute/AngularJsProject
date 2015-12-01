angular.module('appHome').factory("apiService", ['$q','$http', function ($q, $http) {
    var googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    
    return {
        findBooksByIsbn: function (parameter) {
            var defered = $q.defer();
            $http.get(googleApiUrl + "isbn:" + parameter)
            .success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        },
        findBooksGeneral: function (parameter) {
            var defered = $q.defer();
            $http.get(googleApiUrl + parameter)
            .success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }
    };
}]);