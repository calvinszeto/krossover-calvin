app.directive("videoUploader", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_uploader/video_uploader.html',
		controller: ['$scope', 'Upload', '$location', function($scope, Upload, $location) {
			$scope.upload = function($file) {
				Upload.upload({
					url: '/api/v1/videos',
					data: {video: {full_video: $file}}
				}).then(function(response) {
					var video = response.data;
					$location.path('/editor/' + video.id);
				});
			};
		}]
	};
})
