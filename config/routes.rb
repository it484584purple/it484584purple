Rails.application.routes.draw do
  get 'account/profile'

  get 'account/settings'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resources :home, only: [:show]
  resources :setcardgame
  resources :setrules

  root to: "home#show"
end