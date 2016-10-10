Rails.application.routes.draw do
	namespace :api, defaults: {format: :json} do
		namespace :v1 do
			resources :videos
		end
	end

	get'*path' => 'home#index'
	root 'home#index'
end
