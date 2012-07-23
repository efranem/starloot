/**
 * @author alkaitz
 */
function Node(x, y, numAnimations, files){
	var _point = {x: x, y: y};
	var _currentSprite = 0;
	var _sizeOfSprite = {x: 128, y: 128};
    var _offsetDrawingZone = {x: 64, y: 64};
	var _animations = new Array;
	for (var idx = 1; idx <= numAnimations; idx++){
        var name = files + zfill(idx, 2);
        _animations.push(new Animation(name, _point.x - _offsetDrawingZone.x, _point.y - _offsetDrawingZone.y, _sizeOfSprite, 1, 0, true, false));
    };
};
