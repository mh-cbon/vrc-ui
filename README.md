# vrc-ui

Vlc Remote Control UI.

Work in progress.

# Technical

It s an UI built on top of `riot.js`, `webpack`,

It relies on
- [vlc http interface](https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt)
- [cors-proxy](https://github.com/mh-cbon/cors-proxy) to fix VLC [CORS issues](https://trac.videolan.org/vlc/ticket/8848)
- [node-vlc-api](https://github.com/mh-cbon/node-vlc-api) to interface with vlc http interface
- [http file store api](https://github.com/mh-cbon/http-file-store) to transfer files to play on vlc
- [bonjour](https://github.com/watson/bonjour) server with an [http interface](https://github.com/mh-cbon/bonjour-over-http)
to [find various servers](https://github.com/mh-cbon/bonjour-publish)
- [http client interface of webtorrent](https://github.com/mh-cbon/webtorrent-http-api) to handle torrents

All of that to control a vlc remote instance and offer a cool drag and drop interface.

# Install

No installation method is provided as you should use a packaged app such `vrc-electron`

# develop

Pre requesites
- `npm install http-server -g`
- `npm install webpack -g`
- `npm install mh-cbon/cors-proxy -g`
- `npm install mh-cbn/bonjour-publish -g`
- `npm install mh-cbn/http-file-store -g`
- `npm install mh-cbn/bonjour-over-http -g`
- `npm install mh-cbn/bonjour-publish -g`
- `npm install mh-cbn/webtorrent-http-api -g`
- `git clone git@github.com:mh-cbon/vrc-ui.git`
- `cd vrc-ui && npm i`
- `npm run dev`

# Read more
- https://github.com/mh-cbon/node-vlc-api
- http://riotjs.com
- http://webpack.github.io/docs/
- https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
