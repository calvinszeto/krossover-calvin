class Video < ActiveRecord::Base
	mount_uploader :full_video, VideoUploader
	has_many :video_clips

	after_create :set_video_name

	private

	def self.whitelisted_attributes
		[:name, :full_video]
	end

	def set_video_name
		unless full_video.file.nil?
			filename = full_video.file.filename
			self.update_attribute :name, File.basename(filename, File.extname(filename))
		else
			self.update_attribute :name, "Untitled"
		end
	end
end
