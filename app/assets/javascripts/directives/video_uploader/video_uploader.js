app.directive("videoUploader", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/directives/video_uploader/video_uploader.html',
		controller: ['$scope', 'Upload', 'Videos', function($scope, Upload, Videos) {
			$scope.upload = function($file) {
				Upload.upload({
					url: '/api/v1/videos',
					data: {video: {full_video: $file}}
				});
			};
		}]
	};
})
