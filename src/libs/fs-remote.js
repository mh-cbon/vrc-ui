var url = require('url');

function FSRemote (opts) {

  var self = this;

  var remote = {
    protocol: 'http:',
    hostname: null,
    port: null,
    username: null,
    password: null,
    url_base: null,
  };

  // configuration
  self.setEndPoint = function (opts) {
    remote = opts;
  }
  opts && self.setEndPoint(opts);

  var remoteUrl = function (path, query) {
    return url.format({
      protocol: remote.protocol,
      auth:     remote.username + ':' + remote.password,
      hostname: remote.hostname,
      port:     remote.port,
      query:    query,
      pathname: remote.url_base + '/' + path,
    })
  }

  var xhrResponseHandler = function (xhr, then) {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var err;
      var res;
      console.log(xhr);
      if (xhr.status !== 200) {
        err = {
          status: xhr.status,
          reason: 'something to do'
        }
      } else {
        try{
          res = JSON.parse(xhr.responseText);
        } catch(ex) {
          err = {
            status: xhr.status,
            reason: ex
          }
        }
      }
      then && then(err, res);
    }
  }


  this.read = function (path, then) {
    var action = remoteUrl (path)

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(ev) {
      xhrResponseHandler(xhr, then);
    };
    xhr.open('GET', action, true);
    xhr.send();
  }

  this.write = function (path, html5File, then) {
    var res = riot.observable();
    var action = remoteUrl (path);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(ev) {
      xhrResponseHandler(xhr, function (err, res) {
        err && res.trigger('error', err);
        res && res.trigger('data', res);
        res.trigger('end');
        then && then(err, res);
      });
    };
    xhr.upload.addEventListener('progress', function (ev) {
      res.trigger('progress', ev);
    }, false);
    xhr.open('POST', action, true);
    var data = new FormData();
    data.append('file', html5File);
    xhr.send(data);
    return res;
  }

  this.overwrite = function (path, html5File, then) {
    var res = riot.observable();
    var action = remoteUrl (path, {overwrite: 1})

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(ev) {
      xhrResponseHandler(xhr, function (err, res) {
        err && res.trigger('error', err);
        res && res.trigger('data', res);
        res.trigger('end');
        then && then(err, res);
      });
    };
    xhr.upload.addEventListener('progress', function (ev) {
      res.trigger('progress', ev);
    }, false);
    xhr.open('POST', action, true);
    var data = new FormData();
    data.append('file', html5File);
    xhr.send(data);
    return res;
  }
}

module.exports = FSRemote;
