class VideoClip < ActiveRecord::Base
	validates :video_id, presence: true
	validates :start, presence: true

	belongs_to :video

	def self.whitelisted_attributes
		[:name, :start, :end]
	end
end
