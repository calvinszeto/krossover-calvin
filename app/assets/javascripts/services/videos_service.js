app.factory('Videos', ['$resource', function($resource) {
	var resource = $resource('/api/v1/videos/:videoId', {videoId:'@id'}, {
		update: {
			method: 'PUT'
		}
	});
	return resource;
}])
