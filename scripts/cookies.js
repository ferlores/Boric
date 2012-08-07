var request = require('request'),
    url = require('url');

module.exports = function (robot){
  robot.Response.prototype.httpAuth = function(options, callback){
    // No auth defined for this server
    if (!process.env[key + '_AUTH'] || !process.env[key + '_AUTH_URL']) {
      request(options, callback);
    }

    var uri = typeof options === 'string' ? options : options.uri || options.url,
        key = url.parse(uri).hostname.replace(/\./g,'').toUpperCase(),
        auth = process.env[key + '_AUTH'].split(':'),
        opts = { 
          url: process.env[key + '_AUTH_URL'],
          method: 'POST',
          'content-type': 'application/x-www-form-urlencoded',
          body: 'userid=' + auth[0] + '&password=' + auth [1],
        };

    request(opts, function (er, res, body){
      if (er) return callback(er);
      request(options, callback);
    });  
  }
  
  /* EXAMPLE
  robot.hear(/test/, function(msg){
    msg.httpAuth('https://my.jwt.com/wwitbugs/', function (er, res, body) {
      msg.send(body)
    })  
  })
  */
}
