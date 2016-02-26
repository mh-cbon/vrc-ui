# vrc-ui

Vlc Remote Control UI.

Work in progress.

# Technical

It s a demo app using `riot.js`, `webpack` to control a vlc remote instance via `node-vlc-api`.

# Install

No installation method is provided as you should use a packaged app such `vrc-electron`

# develop

Pre requesites
- `npm install http-server -g`
- `npm install webpack -g`
- `git clone git@github.com:mh-cbon/vrc-ui.git`
- `cd vrc-ui && npm i`

Then,
- `npm run watch`
- `npm run http`

You may need to start a vlc instance on your local
- `vlc -I http --http-password 123`

# Read more
- https://github.com/mh-cbon/node-vlc-api
- http://riotjs.com
- http://webpack.github.io/docs/
