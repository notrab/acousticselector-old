# AcousticSelector.com

This repo contains the source code for both the client and server.

## Installation

🚨 You **must** have Homebrew, Yarn, Git and [Direnv](direnv.net) installed to follow this instructions uninterrupted.

Make sure you have the latest of version of the [Graphcool Framework Preview](https://github.com/graphcool/graphcool) installed.

  ```shell
  $ npm i -g graphcool
  $ git clone https://github.com/Norseal/acousticselector.com.git
  $ cd acousticselector.com
  $ yarn
  ```

The Graphcool Framework Preview is in active development and is known to make breaking API changes. See their GitHub for more up to date information.

## Development

### Server
`.envrc` must be populated with the following environment variables in order to deploy to Graphcool successfully.

* `NEW_REPORT_SLACK_WEBHOOK_URL`
* `NEW_USER_SLACK_WEBHOOK_URL`

These can be obtained from the Slack management console.

If you're not logged into `graphcool` you must run `graphcool login` and `graphcool init` to obtain a new development service/project ID. Update the `dev target` inside `.graphcoolrc` with your new service/project ID.

### Client
The client is a React SPA that uses at its core Redux, React Router and Apollo Client.

Create a file called `.env.local` in the root directory and add the following environment variables:

* `REACT_APP_GRAPHQL_URI`
* `REACT_APP_GRAPHQL_FILE_URI`

You can obtain these by running `graphcool info`.

To start the client application, simply type `yarn start`. The page will open automatically on the default `PORT` 3000.

## Deploy

First build the project using `yarn build` and then run `now`.
