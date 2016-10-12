Rails.application.routes.draw do
	root 'home#index'

	namespace :api, defaults: {format: :json} do
		namespace :v1 do
			resources :videos do
				resources :video_clips
			end
		end
	end

  get 'assets/*page' => redirect('/404.html')
	get '*path' => 'home#index'
end
