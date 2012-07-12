function Camera(){
	this.CAMERA_SPEED_X = 0;
	this.CAMERA_SPEED_Y = 0;
	this.transformX = 0;
	this.transformY = 0;
	this.minX = 0;
	this.minY = 0;
	this.maxX = 2000;
	this.maxY = 2000;
	
	this.applyTransforms = function(ctx){
		ctx.scale(1, 0.5);
		ctx.rotate(45 * Math.PI /180);
	};
	
	this.applyLimits = function(){
		if (this.transformX < this.minX) {this.transformX = this.minX; this.CAMERA_SPEED_X = 0;}
		if (this.transformY < this.minY) {this.transformY = this.minY; this.CAMERA_SPEED_Y = 0;}
		if (this.transformX > this.maxX) {this.transformX = this.maxX; this.CAMERA_SPEED_X = 0;}
		if (this.transformY > this.maxY) {this.transformY = this.maxY; this.CAMERA_SPEED_Y = 0;}
	};
    
    this.localPosition = function(point){
        return { x: point.x + this.transformX, y: point.y + this.transformY};
    };
	
	this.cam_direction_X	= 0;
	this.cam_direction_Y	= 0;
	this.updateLogic = function(){
		this.applyLimits();
		
		// Update camera position
		if (this.cam_direction_X>0) {
			if (this.cam_direction_X==2) {
				this.CAMERA_SPEED_X += 0.5;
			} else if (this.cam_direction_X==1) {
				this.CAMERA_SPEED_X -= 0.5;
			}
		} else {
			if (this.CAMERA_SPEED_X < 0.3 && this.CAMERA_SPEED_X > -0.3) {this.CAMERA_SPEED_X = 0;}
			if (this.CAMERA_SPEED_X > 0) {this.CAMERA_SPEED_X -= 0.3;}
			if (this.CAMERA_SPEED_X < 0) {this.CAMERA_SPEED_X += 0.3;}
		}
		
		if (this.cam_direction_Y>0) {
			if (this.cam_direction_Y==2) {
				this.CAMERA_SPEED_Y += 0.5;
			} else if (this.cam_direction_Y==1) {
				this.CAMERA_SPEED_Y -= 0.5;
			}
		} else {
			if (this.CAMERA_SPEED_Y < 0.3 && this.CAMERA_SPEED_Y > -0.3) {this.CAMERA_SPEED_Y = 0;}
			if (this.CAMERA_SPEED_Y > 0) {this.CAMERA_SPEED_Y -= 0.3;}
			if (this.CAMERA_SPEED_Y < 0) {this.CAMERA_SPEED_Y += 0.3;}
		}
		this.transformX += this.CAMERA_SPEED_X;
		this.transformY += this.CAMERA_SPEED_Y;
		
		this.cam_direction_X = 0;
		this.cam_direction_Y = 0;
	};
}

camera = new Camera;



