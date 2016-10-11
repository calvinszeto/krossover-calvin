app.factory('VideoClips', ['$resource', function($resource) {
	var resource = $resource('/api/v1/videos/:videoId/video_clips/:video_clip_id');
	return resource;
}])
