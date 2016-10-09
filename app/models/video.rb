class Video < ActiveRecord::Base
	mount_uploader :full_video, VideoUploader
end
