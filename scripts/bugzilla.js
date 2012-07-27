//Description:
//  Allows Hubot to hear if someone speaks about a bug and create the URL.
//
//Dependencies:
//  None
//
//Configuration:
//  None
//
//Commands:
//  bug #<bug number> - Allows Hubot to hear if someone speaks about a bug and create the URL.
//
//Author:
//  aluebs

module.exports = function (robot) {
   robot.hear(/bug #([0-9]+)/i, function(msg) {
      if(process.env['BUGZILLA_HOST']) {
         msg.send('Bugzilla bug #'+msg.match[1]+': '+process.env['BUGZILLA_HOST']+'/show_bug.cgi?id='+msg.match[1])
      }
   });
}
