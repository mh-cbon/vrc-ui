var riot = require('riot')

require('./tags/configuration.tag');
require('./tags/remote-control.tag');
require('./tags/drop.tag');
require('./tags/playlist.tag');
require('./tags/transfer.tag');


var SvcController  = require('./services-controller.js');
var VlcController  = require('./vlc-controller.js');
var FSRemote       = require('./libs/fs-remote.js');
var TorrentRemote  = require('./libs/torrent-remote.js');

document.addEventListener('DOMContentLoaded', function () {

  var svc     = new SvcController({port: 8090});
  var vlc     = new VlcController();
  var fs      = new FSRemote();

  var confTag     = riot.mount('configuration', {})[0];
  var vlcTag      = riot.mount('remote-control', {vlc: vlc, status:{}, meta:{}, maxVolume: 512 /* vlc specifics ?*/})[0]
  var playlistTag = riot.mount('playlist', {vlc: vlc, items: []})[0]
  var transferTag = riot.mount('transfer', {items: []})[0]
  var dropTag     = riot.mount('drop', {})[0]

  var transferer  = riot.observable()

  var discoverService = function () {
    svc.discoverHosts({timeout: 500}, function (err, hosts){
      !err && confTag.trigger('hosts-found', hosts)
    })
  };
  discoverService();

  confTag.on('refresh', discoverService)

  confTag.on('remote-selected', svc.selectHost.bind(svc))
  confTag.on('remote-unselected', svc.unselectHost.bind(svc))

  svc.on('vlc-found', function (service) {
    vlc.setEndPoint(service);
    vlc.start();

    var urlDropped = function (f) {
      vlc.enqueue(f.data, function () {
        console.log(arguments)
      })
    }

    dropTag.on('url-dropped', urlDropped)

    svc.one('vlc-leave', function (service) {
      dropTag.off('url-dropped', urlDropped);
      vlc.stop();
      vlc.setEndPoint({});
    })
  })

  svc.on('fs-found', function (service) {
    fs.setEndPoint(service);

    var fileDropped = function (f) {
      // var transfer = remoteFS.write('/', f.data);
      // transferer.emit('enqueue', transfer)
    }

    dropTag.on('file-dropped', fileDropped)

    svc.one('fs-leave', function (service) {
      dropTag.off('file-dropped', fileDropped);
    })
  })



})
