json.array! @video_clips do |video_clip|
	json.id video_clip.id
	json.name video_clip.name
	json.start video_clip.start
	json.end video_clip.end
end
