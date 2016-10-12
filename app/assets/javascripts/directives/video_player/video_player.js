app.directive("videoPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_player/video_player.html',
		scope: {
			editable: '='
		},
		controller: ['$scope', 'Videos', '$routeParams', '$sce', 'VideoClips', '$timeout', function($scope, Videos, $routeParams, $sce, VideoClips, $timeout) {
			var timeInSeconds = function(time) {
				var times = time.split(":"); // "hh:mm:ss"
				return parseInt(times[0]) * 3600 + parseInt(times[1]) * 60 + parseInt(times[2]);
			}

			var timeInString = function(time) {
				var hours = String("00" + Math.floor(time / 3600)).slice(-2);
				var minutes = String("00" + Math.floor((time % 3600) / 60)).slice(-2);
				var seconds = String("00" + Math.floor(time % 60)).slice(-2);
				return [hours, minutes, seconds].join(":");
			}

			var validateClip = function(clip) {
				var duration = document.getElementById('video').duration;
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

			var setDefaults = function(clip) {
				var duration = document.getElementById('video').duration;
				// Set defaults for start and end
				clip.start = clip.start || timeInString(0);
				clip.end = clip.end || timeInString(duration);
			}

			var setVideoClips = function(clips) {
				// Make the full video the first clip
				$scope.videoClips = [
						{
							name: 'Full Video',
							start: '0',
							playing: true
						}
				];
				Array.prototype.push.apply($scope.videoClips, clips);
			};

			var resetPlaying = function() {
				$scope.videoClips.forEach(function(clip) {
					clip.playing = false;
				});
			};

			var setLoadingListener = function() {
					var video = document.getElementById('video');
					var loadVideo = function() {
						video.removeEventListener('loadeddata', loadVideo);
						$scope.video.ready = true;
						$scope.$apply();
					}
					video.addEventListener('loadeddata', loadVideo);
			};

			$scope.setVideoLinkFromClip = function(clip, index, delay) {
				// Run loading animation in a separate digest
				$timeout(function() { 
					$scope.video.ready = false;
					$scope.$apply();
				}, 0, false);
				
				// Replace the video with the clip
				var videoLink = $scope.video.video_url + '#t=' + clip.start;	
				if (clip.end) {
					videoLink += ',' + clip.end;
				}
				$scope.videoLink = $sce.trustAsResourceUrl(videoLink);

				// Set the clip as currently playing
				resetPlaying();
				$scope.videoClips[index].playing = true;

				var video = document.getElementById('video');
				$timeout(function() {
					if(video.readyState === 4) {
						$scope.video.ready = true;
					} else {
						setLoadingListener();
					}
				
					video.play();

					if ($scope.video.autoplay) {
						var playNextClip = function() {
							if(video.currentTime >= timeInSeconds(clip.end)) {
								video.removeEventListener('timeupdate', playNextClip);
								if(index + 1 < $scope.videoClips.length) {
									$scope.setVideoLinkFromClip($scope.videoClips[index+1], index+1, 3000);
								}
							}
						};

						video.addEventListener('timeupdate', playNextClip);
					}
				}, delay, true);
			};

			$scope.createNewClip = function() {
				setDefaults($scope.newClip);

				// Check validations
				$scope.newClipError = undefined;
				var error = validateClip($scope.newClip);
				if(error === "") {
					var videoClips = VideoClips.save({videoId: videoId}, $scope.newClip, function () {setVideoClips(videoClips)});
					$scope.newClip = {};
				} else {
					$scope.newClipError = error;
				}
			}

			$scope.updateClip = function(clip) {
				setDefaults(clip);

				// Check validations
				clip.error = undefined;
				var error = validateClip(clip);
				if(error === "") {
					var videoClips = VideoClips.update({videoId: videoId, videoClipId: clip.id}, clip, function () { setVideoClips(videoClips)});
				} else {
					clip.error = error;
				}
			}

			$scope.deleteClip = function(clip) {
				var videoClips = VideoClips.delete({videoId: videoId, videoClipId: clip.id}, function () {setVideoClips(videoClips)});
			}

			$scope.updateVideo = function() {
				$scope.video.editing = false;
				var video = Videos.update({videoId: videoId}, $scope.video, function() {
					$scope.video.name = video.name;
				});
			}

			$scope.videoClips = [];
			$scope.newClip = {};
			var videoId = $routeParams.videoId;

			if(videoId !== undefined) {
				// Set the current video
				$scope.video = Videos.get({videoId: videoId}, function() {
					$scope.videoLink = $sce.trustAsResourceUrl($scope.video.video_url);
					setLoadingListener();
				});	
				// Set the video clips
				var videoClips = VideoClips.query({videoId: videoId}, function() {
					setVideoClips(videoClips);
				});
			}

			// Set up hotkeys
			//Mousetrap.bind('j', playNext);
			//Mousetrap.bind('k', playPrevious);
		}]
	}
})
