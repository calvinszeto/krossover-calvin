app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		controller: ['$scope', 'Videos', function($scope, Videos) {
			
		}]
	}
})
