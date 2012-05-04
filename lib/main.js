const data = require('self').data;
const widgets = require("widget");

const app = require('app');

var panel,
    widget,
    counter;


//panel
panel = require('panel').Panel({
  width: 300,
  height: 600,
  contentURL: data.url('panel.html'),
  contentScriptFile: data.url('panel.js'),
  onShow: function(){
    if(!this.isShowing){
      return;
    }

    this.port.emit('reloadPanel');
  },
  onHide: function(){
    counter.setUp();
  }
});

panel.port.on('click-link', function(url){
  panel.hide();
  require('tabs').open(url);
});


//widget
widget = widgets.Widget({
  id: "hatenanotify-link",
  label: "Hatena Notify Popup",
  contentURL: "http://cdn.www.st-hatena.com/images/header/notify-wh.png",
  panel: panel
});


//counter
counter = widgets.Widget({
  id: "hatenanotify-counter",
  label: "Hatena Notify Counter",
  width: 40,
  content: " "
});

counter.setUp = function(c){
  if(!c){
    c = ' ';
  }

  this.content = c;
  this.width = 40;
};


new app.App({
  widget: widget,
  counter: counter
}).setUp();

