Rails.application.routes.draw do
	root 'home#index'

	namespace :api, defaults: {format: :json} do
		namespace :v1 do
			resources :videos do
				resources :video_clips
			end
		end
	end

	get '*path' => 'home#index'
end
