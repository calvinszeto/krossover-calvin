app.factory('Videos', ['$resource', function($resource) {
	var resource = $resource('/api/v1/videos/:videoId', {videoId:'@id'});
	return resource;
}])
