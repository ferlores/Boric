/* Description:
 *   Will give a warm welcome to anyone joining the chat room.
 *
 * Dependencies:
 *   None
 *
 * Configuration:
 *   None
 *
 * Commands:
 *   None
 *
 * API used:
 *   http://iheartquotes.com/api/
 * Author:
 *   martinpaoloni
 */
module.exports = function (robot) {
  robot.enter(function(msg) {
    msg.http('http://www.iheartquotes.com/api/v1/random')
      .query({
        max_lines: 1,
        format: 'json'
      })
      .get()(function(err, res, body) {
        response = JSON.parse(body);
        msg.send('Welcome, ' + msg.message.user.name + '! Here\'s an interesting quote for you:');
        msg.send(response.quote.replace(/&quot;/g,'"') + ' [' + response.source + ']')
      }
    );
  });
}

