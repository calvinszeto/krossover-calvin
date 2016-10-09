class Video < ActiveRecord::Base
	mount_uploader :full_video, VideoUploader

	def self.whitelisted_attributes
		[:name]
	end
end
