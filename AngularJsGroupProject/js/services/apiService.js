angular.module('appHome').factory("apiService", ['$q','$http', function ($q, $http) {
    var googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var defered = $q.defer();
    return {
        findBooksByIsbn: function (parameter) {
            
            $http.get(googleApiUrl + "isbn:" + parameter)
            .success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        },
        findBooksGeneral: function (parameter) {

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