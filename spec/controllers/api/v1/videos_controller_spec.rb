require "rails_helper"

describe Api::V1::VideosController do
	render_views

	describe 'create' do
		let(:sample_video) {fixture_file_upload('files/sample.mp4', 'video/mp4')}

		it 'should save the name of the video' do
			post :create, params: {video: {name: 'test video'}}, format: :json
			expect(response.status).to eq 200
			video = JSON.parse(response.body)
			expect(video['name']).to eq('test video')
		end

		it 'should allow a video to be uploaded' do
			post :create, params: {video: {name: 'test video', full_video: sample_video}}, format: :json
			expect(response.status).to eq 200
			video = JSON.parse(response.body)
			expect(video['name']).to eq('test video')
			expect(video['video_url']).not_to be_nil
		end
	end
end
