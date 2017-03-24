var app = angular.module('myApp', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/',{
      templateUrl: '../partials/regandlogin.html',
  })
  .when('/polls/',{
      templateUrl: '../partials/all.html',
  })
  .when('/polls/new',{
      templateUrl: '../partials/new.html',
  })
  .when('/polls/:id',{
      templateUrl: '../partials/detail.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
