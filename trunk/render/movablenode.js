/**
 * @author alkaitz
 * @param name Name of current node
 * @param speed Integral speed of current node
 * @param x X coordinate of central point of node
 * @param y Y coordinate of central point of node
 * @param numAnimations number of different animations that node will have
 * @param numFrames [x:, y:] Number of frames in each dimension of graphic
 * @param files prefix of name of animation files 
 */
 MovableNode.inherits( Node );
 function MovableNode(name, speed, x, y, numAnimations, numFrames, files){
	/**
		Own properties
	*/
	var _angle = 0 * Math.PI/180;
	var _velocity = 2;
	var _target = undefined;
	var _path = new Array;
	
	this.setAngle = function(angle){
		_angle = angle;
		if (_angle < 0)
			_angle += (2 * Math.PI);
		_angle %= (2 * Math.PI);
	};
	
	this.getAngle = function(){
		return _angle;
	};
	
	this.setPath = function(path){
		_path = path;
	};
	
	this.getPath = function(){
		return _path;
	};
	
	this.setTarget = function(target){
		_target = target;
	};
	
	this.getTarget = function(){
		return _target;
	};
	
	this.setVelocity = function(v){
		_velocity = v;
	};
	
	this.getVelocity = function(){
		return _velocity;
	};
	
	/**
		Node inheritance calling public constructor with parameters
	*/
	this.inherits( Node, name, x, y, numAnimations, numFrames, files );
 };
 
 MovableNode.prototype.update = function(){
	var position = this.getPosition();
	var path = this.getPath();
	var target = this.getTarget();
	var velocity = this.getVelocity();
	var angle = this.getAngle();
	if (path != undefined && path.length > 0 && target == undefined) {
		this.setTarget( path.splice(0,1)[0] );
	}
	if (target != undefined && Math.abs(target.x - position.x) < 1.5 && Math.abs(target.y - position.y) < 1.5){
		this.setTarget( undefined );
	}
	if (velocity != 0 && target != undefined){
		var alpha = Math.atan2(target.y - position.y, target.x - position.x);
		if (alpha < 0) alpha += 2 * Math.PI;
		else alpha %= 2 * Math.PI;
		//console.log("Alpha: "+(scout.angle/(Math.PI/180)).toFixed(2) +" degrees");
		var tempAngle = (2 * Math.PI) - alpha;		
		// First we turn to get correct direction and if we got the right direction we move
		if (Math.abs(tempAngle - angle) < 0.1){ // If the angle is correct we move
			this.setAngle( tempAngle );
			var x = position.x + Math.cos(alpha) * velocity;
			var y = position.y + Math.sin(alpha) * velocity;
			this.setPosition(x, y);
		} else { // We turn
			if (direction(angle, tempAngle) == AngleDirection.COUNTER){
				this.setAngle( angle - 0.075 );
			}
			else {
				this.setAngle( angle + 0.075 );
			}
		}
		// Update painting data
		angle = this.getAngle();
		this.setCurrentAnimation( Math.round(angle / (11.25 * (Math.PI/180))) % 32 );
		var newPosition = this.getPosition();
		var offset = this.getOffsetDrawingZone();
		this.getCurrentAnimation().setOrigin(newPosition.x - offset.x, newPosition.y - offset.y );
		//this.animSelected.setOrigin(newPosition.x - offset.x, newPosition.y - offset.y + 15);
	}
 };
 
 MovableNode.prototype.paint = function(ctx){
	Node.prototype.paint.call(this, ctx);
};