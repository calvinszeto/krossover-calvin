app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		controller: ['$scope', 'Videos', '$routeParams', '$sce', 'VideoClips', function($scope, Videos, $routeParams, $sce, VideoClips) {
			$scope.setVideoLinkFromClip = function(clip) {
				var videoLink = $scope.fullVideoLink + '#t=' + clip.start;	
				if (clip.end) {
					videoLink += ',' + clip.end;
				}
				$scope.videoLink = $sce.trustAsResourceUrl(videoLink);
			};

			$scope.createNewClip = function() {
				$scope.videoClips.push($scope.newClip);	
				VideoClips.save({videoId: videoId}, $scope.newClip);
				$scope.newClip = {};
			}

			$scope.updateClip = function(clip) {

			}

			$scope.deleteClip = function(clip) {

			}

			$scope.videoClips = [];
			$scope.newClip = {};
			var videoId = $routeParams.videoId;

			if(videoId !== undefined) {
				// Set the current video
				$scope.video = Videos.get({videoId: videoId}, function() {
					$scope.videoLink = $sce.trustAsResourceUrl($scope.video.video_url);
				});	
				// Make the full video the first clip
				$scope.videoClips.push(
						{
							name: 'Full Video',
							start: '0'
						}
				);
				// Set the remaining clips
				var videoClips = VideoClips.query({videoId: videoId}, function() {
					Array.prototype.push.apply($scope.videoClips, videoClips);
				});
			}
		}]
	}
})
