function Camera(){
	this.CAMERA_SPEED = 10;
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
	
	this.applyLimits = function(ctx){
		if (this.transformX < this.minX) this.transformX = this.minX;
		if (this.transformY < this.minY) this.transformY = this.minY;
		if (this.transformX > this.maxX) this.transformX = this.maxX;
		if (this.transformY > this.maxY) this.transformY = this.maxY;
	};
}

camera = new Camera;



