class Api::V1::VideoClipsController < ApiController
	before_action :set_video	
	before_action :set_video_clip, only: [:update, :destroy]

	def index
		@video_clips = @video.video_clips
	end

	def create
		@video_clip = @video.video_clips.new(video_clip_params)

		if @video_clip.save
			render :index
		else
			render status: 400
		end
	end

	def update
		@video_clip.update_attributes video_clip_params
		render :index
	end

	def destroy
		@video_clip.destroy
		render :index
	end

	private

	def set_video
		@video = Video.find(params[:video_id])
	end

	def set_video_clip
		@video_clip = VideoClip.find(params[:id])
	end

	def video_clip_params
		params.require(:video_clip).permit(VideoClip.whitelisted_attributes)
	end
end
