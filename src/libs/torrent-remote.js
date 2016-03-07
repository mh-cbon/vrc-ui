var url = require('url');

function TorrentRemote (opts) {

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


  self.dld = function(filePath, then){
    // var xhr = new XMLHttpRequest();
    // var action = 'http://127.0.0.1:8081/add';
    //
    // xhr.open("POST", action, true);
    //
    // var params = {
    //   torrent: torrent.value,
    //   immediate: true
    // };
    // params = JSON.stringify(params)
    //
    // xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    // xhr.setRequestHeader("Content-length", params.length);
    // xhr.setRequestHeader("Connection", "close");
    //
    // xhr.onreadystatechange = function() {
    //   if(xhr.readyState == 4) {
    //     console.log(xhr.responseText);
    //     results.innerHTML = JSON.stringify(
    //       JSON.parse(xhr.responseText), null, 4
    //     )
    //   }
    // }
    // xhr.send(params);
  }

  self.status = function(then){
    // var xhr = new XMLHttpRequest();
    // var action = 'http://127.0.0.1:8081/status';
    //
    // xhr.open("POST", action, true);
    //
    // xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    // xhr.setRequestHeader("Connection", "close");
    //
    // xhr.onreadystatechange = function() {
    //   if(xhr.readyState == 4) {
    //     results.innerHTML = JSON.stringify(
    //       JSON.parse(xhr.responseText), null, 4
    //     )
    //   }
    // }
    // xhr.send();
  }


}

module.exports = TorrentRemote;
