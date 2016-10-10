app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		controller: ['$scope', 'Videos', '$routeParams', '$sce', function($scope, Videos, $routeParams, $sce) {
			let videoId = $routeParams.videoId;
			if(videoId !== undefined) {
				var video = Videos.get({videoId: videoId}, function(video) {
					$scope.videoLink = $sce.trustAsResourceUrl(video.video_url);
				});	
			}
		}]
	}
})
