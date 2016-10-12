app.factory('VideoClips', ['$resource', function($resource) {
	var resource = $resource('/api/v1/videos/:videoId/video_clips/:video_clip_id', {}, {
		save: {
			method: 'POST',
			isArray: true
		},
		update: {
			method: 'PUT',
			isArray: true
		},
		delete: {
			method: 'DELETE',
			isArray: true
		}
	});
	return resource;
}])
