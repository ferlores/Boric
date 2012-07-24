module.exports = function (robot) {
   robot.hear(/bug#([0-9]+)/i, function(msg) {
      msg.send('Bugzilla bug#'+msg.match[1]+': https://my.jwt.com/wwitbugs/show_bug.cgi?id='+msg.match[1])
   });
}
