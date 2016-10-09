class Api::V1::VideosController < ApiController
	def create
		@video = Video.create!(video_params)
		render json: @video
	end

	private

	def video_params
		params.require(:video).permit(Video.whitelisted_attributes)
	end
end
