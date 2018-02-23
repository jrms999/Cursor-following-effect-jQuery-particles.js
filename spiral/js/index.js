;(function() {
  
  'use strict';
  
  var c = document.getElementById('c');
  var ctx = c.getContext('2d');
  var w = c.width = window.innerWidth;
  var h = c.height = window.innerHeight;
  var cx = w / 2;
  var cy = h / 2;
  var itr = 500;
  var r = 4;
  var of = 0;
  
  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, w, h);
    of -= 1;
    
    for(var i = 0; i < itr; i++) {
      var x = Math.random() * w;
      var y = Math.random() * h;
      var s = r * 2;
      var gx = Math.floor(x / s) * s;
      var gy = Math.floor(y / s) * s;
      var dx = gx - cx;
      var dy = gy - cy;
      var d = Math.sqrt(dx * dx + dy * dy);
      var scl = Math.sin((d + of) * Math.PI / 180);

      ctx.fillStyle = 'white';
      ctx.save();
      ctx.translate(gx, gy);
      ctx.scale(scl, scl);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore(); 

    }
  });
  
})();