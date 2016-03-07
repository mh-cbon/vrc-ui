var riot = require('riot')

var ServicesManager = function (bonjourOpts) {

  var self = this;
  riot.observable(self);

  bonjourOpts = bonjourOpts || {};
  bonjourOpts.port = bonjourOpts.port || 8090;

  var svcBrowser  = new (require('./libs/bonjour-client.js'))(bonjourOpts);

  this.discoverHosts = function (opts, then) {
    opts.timeout = opts.timeout || 2000;
    svcBrowser.find(opts, function (err, services) {
      var hosts = {}
      // re format services by host,
      // filters only those about VLC/File-store/Webtorrent
      services && services.forEach(function (service) {
        if (service.name.match(/vlc|file-store|webtorrent/i)) {
          if(!hosts[service.host]) hosts[service.host] = [];
          hosts[service.host].push(service)
        }
      })
      then && then(err, hosts)
    });
  }

  var vlcService      = null;
  var fsService       = null;
  var torrentService  = null;

  this.selectHost = function (host) {
    host.services.forEach(function(service){
      if (service.name.match(/vlc/i)) {
        vlcService = service;
      } else if (service.name.match(/file-store/i)) {
        fsService = service;
      } else if (service.name.match(/torrent/i)) {
        torrentService = service;
      }
    })
    vlcService && self.trigger('vlc-found', vlcService)
    fsService && self.trigger('fs-found', fsService)
    torrentService && self.trigger('torrent-found', torrentService)
  }

  this.unselectHost = function () {
    vlcService && self.trigger('vlc-leave')
    fsService && self.trigger('fs-leave')
    torrentService && self.trigger('torrent-leave')
    vlcService = null;
    fsService = null;
    torrentService = null;
  }


};

module.exports = ServicesManager;
