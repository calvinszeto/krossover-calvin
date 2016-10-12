app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		controller: ['$scope', 'Videos', '$routeParams', '$sce', 'VideoClips', '$timeout', function($scope, Videos, $routeParams, $sce, VideoClips, $timeout) {
			timeInSeconds = function(time) {
				let times = time.split(":"); // "hh:mm:ss"
				return parseInt(times[0]) * 3600 + parseInt(times[1]) * 60 + parseInt(times[2]);
			}

			timeInString = function(time) {
				let hours = String("00" + Math.floor(time / 3600)).slice(-2);
				let minutes = String("00" + Math.floor((time % 3600) / 60)).slice(-2);
				let seconds = String("00" + Math.floor(time % 60)).slice(-2);
				return [hours, minutes, seconds].join(":");
			}

			validateClip = function(clip, duration) {
				if (!clip.name || clip.name === "") {
					return "Name must not be blank.";
				} else if (timeInSeconds(clip.start) >=  duration) {
					return "Start time must be less than duration.";
				} else if (timeInSeconds(clip.end) > duration) {
					return "End time must be no longer than the duration.";
				} else if (timeInSeconds(clip.start) >= timeInSeconds(clip.end)) {
					return "Start time must be less than end time.";
				} else {
					return "";
				}
			}

			setVideoClips = function(clips) {
				// Make the full video the first clip
				$scope.videoClips = [
						{
							name: 'Full Video',
							start: '0'
						}
				];
				Array.prototype.push.apply($scope.videoClips, clips);
			};

			$scope.setVideoLinkFromClip = function(clip) {
				var videoLink = $scope.fullVideoLink + '#t=' + clip.start;	
				if (clip.end) {
					videoLink += ',' + clip.end;
				}
				$scope.videoLink = $sce.trustAsResourceUrl(videoLink);
			};

			$scope.createNewClip = function() {
				let duration = document.getElementById('video').duration;

				// Set defaults for start and end
				$scope.newClip.start = $scope.newClip.start || timeInString(0);
				$scope.newClip.end = $scope.newClip.end || timeInString(duration);

				// Check validations
				$scope.newClipError = undefined;
				let error = validateClip($scope.newClip, duration);
				if(error === "") {
					var videoClips = VideoClips.save({videoId: videoId, isArray: true}, $scope.newClip, function() {
						setVideoClips(videoClips);
					});
					$scope.newClip = {};
				} else {
					$scope.newClipError = error;
				}
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
				// Set the video clips
				var videoClips = VideoClips.query({videoId: videoId}, function() {
					setVideoClips(videoClips);
				});
			}
		}]
	}
})
