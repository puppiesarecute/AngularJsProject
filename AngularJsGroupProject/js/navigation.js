var bookApp = angular.module('appHome', ['ui.bootstrap','ui.router']);
bookApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("search");
    $stateProvider.state("home", {
            url: "/home",
            templateUrl: "PartialViews/Home.html",
            controller: "homeController"
        }).
        state("myBookshelves", {
            url: "/bookmark",
            templateUrl: "PartialViews/MyBookshelves.html",
            controller: "myBookShelvesController",
            params: { bookmarkItem: null }
        }).
        state("search", {
            url: "/search",
            templateUrl: "PartialViews/Search.html",
            controller: "searchController"
});
});
