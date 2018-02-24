(function() {
'use strict';
/*global CB document setTimeout */
var WAITMS_RUN = 1000 / 30;
var WAITMS_PAUSE = 200;

/**
 * The main loop,
 * @param {CanvasContext} ctx
 * @param {Object} mainobj - object on which to call .tick(ctx, diff)
 */
CB.frameloop = function(ctx, mainobj, ctrl, fpsfunc) {
  var animate, lastTs = new Date(), s = 0, pause, frames = 0;

  if (ctrl) {
    ctrl.handleProperties(mainobj);
    ctrl.registerLoopCallback(function (message) {
      if (message === "pause") {
        pause = true;
      }
      if (message === "run") {
        pause = false;
      }
    });
  }

  animate = function(curTs) {
    var diff = curTs - lastTs, report, logStr;
    // if we're in the background for too long we don't want to break
    // down when we restart
    if (diff > 1000) {
      diff = 100;
    }
    if (diff > pause ? WAITMS_PAUSE : WAITMS_RUN) {
      s = s + diff;
      frames++;
      if (s >= 1000) {
        if (mainobj.report) {
          report = mainobj.report();
        }
        if (ctrl) {
          logStr = "FPS: " + frames + (report ? ", " + report : "");
          ctrl.showLog(logStr);
        }
        if (fpsfunc) {
          fpsfunc(frames);
        }
        s = 0;
        frames = 0;
      }

      if (!pause) {
        mainobj.tick(ctx, diff);
      }
      if (mainobj.draw) {
        mainobj.draw(ctx);
      }
      lastTs = curTs;
    }
    requestAnimationFrame(animate);
  };

  animate();
};
})();
