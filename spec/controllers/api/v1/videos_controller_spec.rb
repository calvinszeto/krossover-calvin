require "rails_helper"

describe Api::V1::VideosController do
	describe 'create' do
		it 'should save the name of the video' do
			post :create, params: {video: {name: 'test video'}}, format: :json
			expect(response.status).to eq 200
			video = JSON.parse(response.body)
			expect(video['name']).to eq('test video')
		end
	end
end
