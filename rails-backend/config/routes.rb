Rails.application.routes.draw do
  resources :comments
  resources :posts
  resources :authors
  get '/authors/:id/posts', to: 'authors#show_posts', as: 'authors_show_posts'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
