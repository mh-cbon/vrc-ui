var async   = require('async')
var numeral = require('numeral')
var Hashes  = require('jshashes')
var riot    = require('riot')

function VlcRemote (opts) {

  var self = this;
  riot.observable(self);

  var remote;
  var currentPlaylist = [];
  var currentStatus   = {};
  var currentStatusHash   = null;
  var currentPlaylistHash = null;
  var currentItem = null;

  // configuration
  self.setEndPoint = function (opts) {
    remote = require('@mh-cbon/vlc-api')(opts);
  }
  opts && self.setEndPoint(opts);

  // polling control
  var stopPull = false;
  var refreshIntl;
  var refreshPeriod = 2500;
  var onUpdate = function () {
    refreshIntl = setTimeout(function () {
      self.start()
    }, refreshPeriod);
  }
  var decelerate = function () {
    refreshPeriod = 2500;
    self.removeListener('update', onUpdate);
    clearTimeout(refreshIntl)
    self.start()
  }
  var accelerate = function () {
    refreshPeriod = 250;
    self.removeListener('update', onUpdate);
    clearTimeout(refreshIntl)
    self.start()
  }
  this.start = function () {
    if (!stopPull) {
      self.one('update', onUpdate)
      refresh()
    }
    stopPull = false
  }
  this.stop = function () {
    stopPull = true
    clearTimeout(refreshIntl)
  }
  function refresh () {
    async.parallel([
      function (next) {
        remote.playlist(function(err, res) {
          updatePlaylist (res)
          next(err);
        });
      },
      function (next) {
        remote.status(function(err, res) {
          if (!err) updateStatus(res)
          next(err);
        })
      }
    ], function (err) {
      self.trigger('update', err);
    })
  }

  // status management
  this.isStopped = function () {
    return this.getStatus().state==='stopped'
  }
  this.isPaused = function () {
    return this.getStatus().state==='paused'
  }
  this.isPlaying = function () {
    return this.getStatus().state==='playing'
  }
  this.hasActiveMedia = function () {
    return this.getStatus().currentplid>-1
  }

  // data management
  this.getPlaylist = function () {
    return currentPlaylist
  }
  this.getStatus = function () {
    return currentStatus
  }
  this.getCurrentItem = function () {
    return currentItem
  }

  // data fetch
  function updateStatus (s) {
    var sHash = new Hashes.MD5().hex(JSON.stringify(s))
    if (sHash!==currentStatusHash) {
      currentStatusHash = sHash
      currentStatus = s;
      currentStatus.hTime   = numeral(currentStatus.time).format('00:00:00');
      currentStatus.hLength = numeral(currentStatus.length).format('00:00:00');
      if (self.isPlaying()) accelerate()
      else decelerate()
      self.trigger('status');
    }
  }
  function updatePlaylist (pl) {
    if (pl && pl.children && pl.children[0]) {
      pl = pl.children[0].children;
      var pHash = new Hashes.MD5().hex(JSON.stringify(pl))
      if (pHash!==currentPlaylistHash) {
        currentPlaylistHash = pHash
        currentPlaylist = pl
        currentPlaylist.forEach(function (item){
          if (item.current && item.current==='current') {
            currentItem = item.id;
          }
          item.hDuration = numeral(item.duration).format('00:00:00');
        })
        self.trigger('playlist');
      }
    }
  }
  this.status = function (then) {
    remote.status(function (err, res) {
      !err && updateStatus (res);
      then && then(err, currentStatus);
    })
  }
  this.playlist = function (then) {
    remote.playlist(function (err, res) {
      !err && updatePlaylist (res);
      then && then(err, currentPlaylist);
    })
  }

  // commands control
  this.enqueue = function (what, opts, then) {
    remote.status.enqueue(what, opts, then)
  }
  this.volumeRel = function (delta, then) {
    delta = delta *5;
    if (delta>0) delta = "+" + delta;
    remote.status.volume(delta, then)
  }
  this.volumeAbs = function (value, then) {
    remote.status.volume(value, then)
  }
  this.resume = function (idToPlay, then) {
    accelerate();
    remote.status.resume(then)
  }
  this.play = function (idToPlay, then) {
    accelerate();
    // vlc commands are not intuituve, check yourself,
    // https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
    remote.status.playlistPlay(idToPlay, then)
  }
  this.pause = function (then) {
    // decelerate();
    remote.status.playlistPause(null, then)
  }
  this.stop = function (then) {
    refreshPeriod = 2500;
    remote.status.stop(then)
  }
}

module.exports = VlcRemote;
