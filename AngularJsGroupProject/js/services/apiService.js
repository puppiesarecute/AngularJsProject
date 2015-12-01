// by Ai Le
angular.module('appHome').factory("apiService", ['$q', '$http', function ($q, $http) {
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
        },
        getMyLibrary: function () {
            // TODO: call node api get all library objects
        },
        getMyLibraryTest: function () { //fall back test data
            var defered = $q.defer();
            $http.get("https://www.googleapis.com/books/v1/volumes?q=the&maxResults=40")
            .success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        },
        addBookToLibrary: function (book) {
            //TODO use POST call to node api
        }
    };
}]);