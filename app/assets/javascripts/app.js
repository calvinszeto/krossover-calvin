app = angular.module('krossover', ['ngRoute', 'ngResource', 'ngFileUpload', 'ui.mask']);

// Add CSRF Token to all AJAX requests
app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}]);

app.config(["$routeProvider",function($routeProvider) {
    $routeProvider
        .when('/editor/:videoId?', {
            controller: 'EditorCtrl',
            templateUrl: '/assets/controllers/editor/editor.html'
        })
        .when('/viewer/:videoId?', {
            controller: 'ViewerCtrl',
            templateUrl: '/assets/controllers/viewer/viewer.html'
        })
        .otherwise({redirectTo: '/editor'});
}]);
