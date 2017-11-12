OmniAuth.config.logger = Rails.logger
OmniAuth.config.full_host = Rails.env.production? ? 'https://domain.com' : 'http://localhost:3000'

Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '221839496538-0f87ue3igb1usskbg9g9r7t04cqoqr3v.apps.googleusercontent.com', 'y0WkATeIevcDeDY2vULNuWow'
end
