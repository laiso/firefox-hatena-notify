const {Cc,Ci} = require("chrome");
const data = require('self').data;
const tabs = require('tabs');


const LOGIN_URL = 'https://www.hatena.ne.jp/login';
const NOTICES_FRAME_URL = 'http://notify.hatena.ne.jp/notices.iframe';
const NOTICES_COUNT_URL = 'http://notify.hatena.ne.jp/notices.count.json';


function App(options){
  this.widget = options.widget;
  this.counter = options.counter;
}

App.prototype.setUp = function(opts){
  this.connect();
  this.widget.on('click', this.openSiginTabIfNeed);
};

App.prototype.connect = function(){
  var self = this;
  require("timers").setInterval(function() {
    self.fetchNoticesCount();
  }, 60*1000*15);
  //}, 1000);
};

App.prototype.clearCounter = function(){
  this.counter.setUp(0);
};

App.prototype.openTab = function(url){
  this.hide();
  tabs.open(url);
};

App.prototype.openSiginTabIfNeed = function(){
  var self = this;
  require('request').Request({
    url: NOTICES_COUNT_URL,
    onComplete: function(response){
      if(response.status  === 403){
        self.panel.hide();
        tabs.open(LOGIN_URL);
      }
    }
  }).get();
};


App.prototype.fetchNoticesCount = function(callback){
  var self = this;
  require('request').Request({
    url: NOTICES_COUNT_URL,
    onComplete: function(response){
      if(response.json === null || response.json.count === 0){
        self.counter.width = 0;
        return;
      }

      console.debug('Hit: '+response.json.count+' notices.');
      self.counter.setUp(response.json.count.toString());
    }
  }).get();
};


exports.App = App;
exports.getFeedURL = function(){
  return NOTICES_FRAME_URL;
};


