# RottenPotatoes demo app: getting started

To get started:

0. `rvm 2.3.1` to install ruby version

0. `gem install bundler`

0. Clone the project from GitHub [it484584](https://github.com/it484584purple/it484584purple) `git clone git@github.com:it484584purple/it484584purple.git`

0. Then `cd it484584purple` to change to the app's directory.

0. Run the command `bundle install --without production` to make sure all the gems (libraries) used by the app are in place.

0. Run `bundle exec rake db:setup` to create the initial database.

0. Run `rails server -p $PORT -b $IP` to start the app.  Cloud9 will pop up a window showing the URL to visit in your browser to interact with the running app.

0. Install gulp globally. `npm install -g gulp-cli`

0. Install node packages for JavaScript `npm install`.

0. Run gulp command to transpile TypeScript to JavaScript `gulp`.