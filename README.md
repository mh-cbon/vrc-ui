# vrc-ui

Vlc Remote Control UI.

Work in progress.

# Technical

It s an app using `riot.js`, `webpack`.

It s using
- the [vlc http interface](https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt)
- with [pico-proxy](https://github.com/drowzy/pico-proxy) to fix VLC [CORS issues](https://trac.videolan.org/vlc/ticket/8848)
- and [node-vlc-api](https://github.com/mh-cbon/node-vlc-api) to interface with vlc http interface
- an [http file store api](https://github.com/mh-cbon/http-file-store) to transfer files to play on vlc
- a [bonjour](https://github.com/watson/bonjour) server via an [http interface](https://github.com/mh-cbon/bonjour-over-http) to announce
and find the [vlc server](https://github.com/mh-cbon/bonjour-vlc)
- an [http client interface of webtorrent](https://github.com/mh-cbon/webtorrent-http-api) to handle torrents

to control a vlc remote instance and offer a cool drag and drop interface.

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
