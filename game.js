var Game = {};

Game.fps = 60;

// Limit painting frames with the number of screen refreshes per second 
Game.initialize = (function() {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function(cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    window.onEachFrame = onEachFrame;
})();
      
Game.loop = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            logic.logicTick(); // Logic tick
            nextGameTick += skipTicks;
            loops++;
        }

        renderer.renderFrame(ctx); // Render tick
    };
})();



