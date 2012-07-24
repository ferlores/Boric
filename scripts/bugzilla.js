// Description:
//   Allows Hubot to hear if someone speaks about a bug and create the URL.
//
// Commands:
//   bug #<bug number>
//
// Examples:
//   User> I was seeing the bug #1234 but i cant reproduce it
//   Boric> Bugzilla bug #1234: BUGZILLA_HOST/show_bug.cgi?id=1234
//
// You need to define the variable BUGZILLA_HOST
module.exports = function (robot) {
   robot.hear(/bug #([0-9]+)/i, function(msg) {
      msg.send('Bugzilla bug #'+msg.match[1]+': '+process.env['BUGZILLA_HOST']+'/show_bug.cgi?id='+msg.match[1])
   });
}
