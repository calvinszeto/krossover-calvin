app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		controller: ['$scope', 'Videos', '$routeParams', '$sce', function($scope, Videos, $routeParams, $sce) {
			$scope.setVideoLinkFromClip = function(clip) {
				var videoLink = $scope.fullVideoLink + '#t=' + clip.start;	
				if (clip.end) {
					videoLink += ',' + clip.end;
				}
				$scope.videoLink = $sce.trustAsResourceUrl(videoLink);
			};

			$scope.createNewClip = function() {
				$scope.videoClips.push($scope.newClip);	
				$scope.newClip = {};
			}

			$scope.videoClips = [];
			// Make the full video the first clip
			$scope.videoClips.push(
					{
						name: 'Full Video',
						start: '0'
					}
			);
			// Set the current video
			let videoId = $routeParams.videoId;
			if(videoId !== undefined) {
				var video = Videos.get({videoId: videoId}, function(video) {
					$scope.fullVideoLink = $sce.trustAsResourceUrl(video.video_url);
					$scope.videoLink = $scope.fullVideoLink;
				});	
			}

			$scope.newClip = {};
		}]
	}
})
