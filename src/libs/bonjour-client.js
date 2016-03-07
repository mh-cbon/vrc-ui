var hyperquest  = require('hyperquest');
var querystring = require('querystring');
var url = require('url');

function BonjourClient (clientOpt) {

  var self = this;

  if (!clientOpt) clientOpt = {}

  if (!clientOpt.host) clientOpt.host = 'localhost'
  if (!clientOpt.port) clientOpt.port = 8080

  self.find = function (opts, then) {
    /*
      if( 'timeout' in req.body)  reqTimeout    = req.body.timeout
      if( 'type' in req.body)     opt.type      = req.body.type
      if( 'subtypes' in req.body) opt.subtypes  = req.body.subtypes
      if( 'protocol' in req.body) opt.protocol  = req.body.protocol
    */
    if (!then && typeof(opts)==='function') {
      then = opts;
      opts = null;
    }

    opts = opts || {};
    if (!opts.timeout) opts.timeout = 2500;
    var postData = querystring.stringify(opts);

    var uri = url.format({
      protocol: 'http',
      hostname: clientOpt.host,
      port:     clientOpt.port,
      pathname: '/find'
    });

    var req = hyperquest.post(uri, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    });

    req.write(postData);
    req.end();

    req.on('error', function (err) {
      then && then(err);
      then = null;
      return;
    });

    req.on('response', function (res) {
      if (res.statusCode!==200) {
        return then && then("Invalid response code " + res.statusCode);
      }

      var body = '';
      res.on('data', function (d) {
        body += d.toString();
      })

      res.on('end', function () {
        var json;
        try {
          json = JSON.parse(body.toString());
          return then && then(null, json);
        } catch (err) {
          return then && then(err);
        }
      });
    });

  }
};

module.exports = BonjourClient;
