class Api::V1::VideosController < ApiController
	def create
		@video = Video.new(video_params)

		if @video.save
			render json: @video
		else
			render status: 400
		end
	end

	private

	def video_params
		params.require(:video).permit(Video.whitelisted_attributes)
	end
end
