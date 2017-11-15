# Set Card Game App: Getting Started

## Fork or Clone the project

* Fork the project

    1. Click the `Fork` button from GitHub [it484584](https://github.com/it484584purple/it484584purple)

* Clone the project

    1. Clone the project from GitHub [it484584](https://github.com/it484584purple/it484584purple) `git clone git@github.com:it484584purple/it484584purple.git`

### Pre-Dependencies

1. `rvm 2.3.1` to install ruby version

1. `gem install bundler`

1. Install gulp globally. `npm install -g gulp-cli`

#### To get started:

1. Then `cd it484584purple` to change to the app's directory.

1. Run the command `bundle install --without production` to make sure all the gems (libraries) used by the app are in place.

1. Run `bundle exec rake db:setup` to create the initial database.

1. Run `rails server -p $PORT -b $IP` to start the app.  Cloud9 will pop up a window showing the URL to visit in your browser to interact with the running app.

1. Install node packages for JavaScript `npm install`.

1. Run gulp command to transpile TypeScript to JavaScript `gulp`.