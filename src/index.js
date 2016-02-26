var riot = require('riot')

require('./tags/remote-control.tag');
require('./tags/drop.tag');
require('./tags/playlist.tag');

var backend     = new (require('./vlc-remote.js'))({password: '123'});
var normalizer  = require('./drop-normalizer.js');

document.addEventListener('DOMContentLoaded', function () {
  var dropper   = riot.observable()
  var uploader  = riot.observable()
  var vlc       = riot.observable()

  dropper.on('dropped', function (dataTransfer) {
    normalizer.normalize(dataTransfer).forEach(function (f) {
      if (f.type==='file') {

      } else if (f.type.match(/uri-list/)) {
        backend.enqueue(f.data, function () {
          console.log(arguments)
        })
      }
    })
  })

  backend.start();
  backend.status(function (err, res) {
    !err && vlc.trigger('status', backend.getStatus())
  })
  backend.playlist(function (err, res) {
    !err && vlc.trigger('playlist', backend.getPlaylist())
  })
  backend.on('playlist', function (err) {
    vlc.trigger('playlist', backend.getPlaylist())
  })
  backend.on('status', function (err) {
    vlc.trigger('status', backend.getStatus())
  })

  vlc.on('ctrl-play', function (plItemId) {
    if (plItemId) {
      backend.play(plItemId, function () {
        console.log(arguments)
      })
    } else if (backend.hasActiveMedia()) {
      if (backend.isPaused()) backend.resume(function () {
        console.log(arguments)
      })
      else if (backend.isPlaying()) backend.pause(function () {
        console.log(arguments)
      })
      else backend.play(backend.getCurrentItem(), function () {
        console.log(arguments)
      })
    }
    else if(backend.getPlaylist().length)
      backend.play(backend.getPlaylist()[0].id, function () {
        console.log(arguments)
      })
    else {
      // trigger alert
    }
  })
  vlc.on('ctrl-pause', function () {
    backend.pause(function (err, res) {
      console.log(err);
      console.log(res)
    })
  })
  vlc.on('ctrl-volume-rel', function (volume) {
    if (volume) {
      backend.volumeRel(volume)
    }
  })
  vlc.on('ctrl-volume-abs', function (volume) {
    if (volume) {
      backend.volumeAbs(volume)
    }
  })
  vlc.on('ctrl-stop', function () {
    backend.stop(function (err, res) {
      console.log(err);
      console.log(res)
    })
  })

  riot.mount('remote-control', {vlc: vlc, status:{}, meta:{}, maxVolume: 512 /* vlc specifics ?*/})
  riot.mount('drop', {dropper: dropper})
  riot.mount('playlist', {vlc: vlc, items: []})
})
