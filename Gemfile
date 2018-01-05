source 'https://rubygems.org'

gem 'rake'
gem 'hanami',       '~> 1.1'
gem 'hanami-model', '~> 1.1'

gem 'pg'

gem 'json'
gem 'hashie'

gem 'bcrypt'

gem 'omniauth-twitter'
gem 'warden'

group :development do
  # Code reloading
  # See: http://hanamirb.org/guides/projects/code-reloading
  gem 'shotgun'
end

group :test, :development do
  gem 'dotenv', '~> 2.0'

  gem 'pry'
  gem 'pry-theme'
end

group :test do
  gem 'rspec-hanami'
  gem 'capybara'
end

group :production do
  # gem 'puma'
end
