app = angular.module('krossover', ['ngRoute', 'ngResource', 'ngFileUpload', 'ui.mask', 'templates']);

// Add CSRF Token to all AJAX requests
app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/editor/:videoId?', {
            controller: 'EditorCtrl',
            templateUrl: 'controllers/editor/editor.html'
        })
        .when('/viewer/:videoId?', {
            controller: 'ViewerCtrl',
            templateUrl: 'controllers/viewer/viewer.html'
        })
        .otherwise({
            redirectTo: '/editor'
        });
}]);
