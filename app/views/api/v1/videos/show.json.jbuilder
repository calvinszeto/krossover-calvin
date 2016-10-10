json.id @video.id
json.name @video.name
json.video_url @video.full_video.try(:url)
