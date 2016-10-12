class Video < ActiveRecord::Base
	mount_uploader :full_video, VideoUploader
	has_many :video_clips

	after_create :set_video_name

	private

	def self.whitelisted_attributes
		[:name]
	end

	def set_video_name
		unless full_video.nil?
			filename = full_video.file.filename
			self.update_attribute :name, File.basename(filename, File.extname(filename))
		end
	end
end
