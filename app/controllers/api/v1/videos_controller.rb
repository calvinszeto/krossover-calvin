class Api::V1::VideosController < ApiController
	def show
		@video = Video.find(params[:id])
	end

	def create
		@video = Video.new(video_params)

		if @video.save
			render :show
		else
			render status: 400
		end
	end

	def update
		@video = Video.find(params[:id])

		if @video.update_attributes(video_params)
			render :show
		else
			render status: 400
		end
	end

	private

	def video_params
		params.require(:video).permit(Video.whitelisted_attributes)
	end
end
