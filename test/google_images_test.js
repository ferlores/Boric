var Tests = require('./lib/tests'),
    helper = Tests.helper(),
    assert = require('assert');

//Load script to test
require('../scripts/google-images')(helper);

var checkText = function (msg, check, done) {
  assert.equal(msg, check);
  done();
}

var checkRegex = function (msg, done) {
  assert.ok(/http:\/\/mustachify.me\/[0-3]\?src\=\(foo\)#.png/.test(msg));
  done();
}

// Test Suite
var tests = [
  checkRegex,
  checkRegex,
  checkRegex,
  checkRegex,
  function(msg, done) {
    checkText(msg, "(foo)#.png", done);    
  },
  function(msg, done) {
    checkText(msg, "(foo)#.png", done);    
  },
  function(msg, done) { 
    checkText(msg, "(foo)#.png", done);    
  },
  function(msg, done) {
    checkText(msg, "(animated foo)#.png", done);    
  }
];

// Messages to test
var messages = [
  'helper: stache me foo',
  'helper: stache foo',
  'helper: mustache me foo',
  'helper: mustache foo',
  'helper: img foo',
  'helper: image me foo',
  'helper: image foo',
  'helper: animate me foo'
];

// HTTP server mockup
var danger = Tests.danger(helper, function(req, res, url) {
  res.writeHead(200);
  return res.end(JSON.stringify({
    responseData: {
      results: [
        {
          unescapedUrl: "(" + url.query.q + ")"
        }
      ]
    }
  }));
});

// Excecute the test suite
describe('google-images', function (){
  before(function(){
    danger.start(tests);
  });

  messages.forEach(function (item) {
    it(item, function(done){    
      helper.receive(item, done);
    })
  })
})
