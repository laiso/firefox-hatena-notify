
self.port.on("reloadPanel", function (){
  var iframe = window.document.getElementById('content');
  iframe.src = 'http://notify.hatena.ne.jp/notices.iframe';
});


/*
window.addEventListener('click', function(e){
  var t = e.target;
  if(t.nodeName !== 'A'){
    return;
  }

  var notifyFrameURL = 'http://notify.hatena.ne.jp/notices.iframe';
  var isNotifyFrame = (window.document.URL.indexOf(notifyFrameURL) === 0);
  if (isNotifyFrame){
    self.port.emit('click-link', t.href);
  }else{
    location.href = notifyFrameURL;
  }

  e.preventDefault();
}, false);
*/

