const main = require("main");

const app = require('app').app;

exports.testRun = function(test) {
  test.pass("Unit test running!");
};

exports.testId = function(test) {
  test.assert(require("self").id.length > 0);
};

exports.testFeedURL = function(test) {
  test.assertEqual(
      "http://www.hatena.ne.jp/login?https://www.hatena.ne.jp/notify/notices.iframe",
      app.getFeedURL());
};

exports.testuserAgent = function(test) {
  app.changeUserAgent();
  test.pass();
};
