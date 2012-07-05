function Camera(){
	this.CAMERA_SPEED = 10;
	this.transformX = 0;
	this.transformY = 0;
	
	this.applyTransforms = function(ctx){
		ctx.scale(1, 0.5);
		ctx.rotate(45 * Math.PI /180);
	}
}

camera = new Camera;



