# vrc-ui

Vlc Remote Control UI.

Work in progress.

# Technical

It s an app using `riot.js`, `webpack`.

It s using
- the [vlc http interface](https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt)
- with [pico-proxy](https://github.com/drowzy/pico-proxy) to fix VLC [CORS issues](https://trac.videolan.org/vlc/ticket/8848)
- and [node-vlc-api](https://github.com/mh-cbon/node-vlc-api) to interface with vlc http interface
to control a vlc remote instance via `node-vlc-api`.

# Install

No installation method is provided as you should use a packaged app such `vrc-electron`

# develop

Pre requesites
- `npm install http-server -g`
- `npm install webpack -g`
- `npm install pico-proxy -g` __you ll need a special version please hang on, it s not ready yet__
- `git clone git@github.com:mh-cbon/vrc-ui.git`
- `cd vrc-ui && npm i`
- `npm run dev`

# Read more
- https://github.com/mh-cbon/node-vlc-api
- http://riotjs.com
- http://webpack.github.io/docs/
- https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
