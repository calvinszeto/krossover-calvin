require "rails_helper"

describe Api::V1::VideoClipsController do
	render_views 

	describe 'index' do
		let(:video) { create(:video) }
		before(:each) do
			5.times do
				create(:video_clip, video: video)
			end
		end

		it 'should return all video clips for the video' do
			get :index, params: {video_id: video.id}, format: :json
			expect(response.status).to eq 200
		end
	end
end
