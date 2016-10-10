class Video < ActiveRecord::Base
	mount_uploader :full_video, VideoUploader
	has_many :video_clips

	def self.whitelisted_attributes
		[:name, :full_video]
	end
end
