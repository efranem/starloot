function FPS(){
	this.fpsVal;
	this.lastLoop = new Date;
	
	this.updateFPS = function(){
		var thisLoop = new Date;
		this.fpsVal = 1000 / (thisLoop - this.lastLoop);
		this.lastLoop = thisLoop;
	}
	
}

fps = new FPS;