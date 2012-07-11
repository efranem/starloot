/**
 x - Central x coord
 y - Central y coord
 file - Name to image file to draw
 size - [pX:, pY:] Number of pixels in each dimension of full sprite
 numFrames - [numX:, numY:] Number of frames in each dimension
*/
function Paintable(x, y, file, size, numFrames){
	this.img = new Image;
	this.img.src = file;
	this.currentSprite = 0;
	this.spriteSize = {x: size.pX / numFrames.numX, y: size.pY / numFrames.numY};
	this.x = x - (this.spriteSize.x / 2); // x is the origin of drawing
	this.y = y - (this.spriteSize.y / 2); // y is the origin of drawing
	this.sprites = new Array;
	for (var j = 0; j < numFrames.numY; j++){
		for (var i = 0; i < numFrames.numX; i++){
			this.sprites.push( {x: this.spriteSize.x * i, y: this.spriteSize.y * j} );
		};
	};
	
	/**
		Sets the current central point of the sprite
	*/
	this.setCentralPoint = function(point){
		this.x = point.x - (this.spriteSize.x / 2);
		this.y = point.y - (this.spriteSize.y / 2);		
	};
	
	/**
		Sets the current frame to draw
	*/
	this.setCurrentFrame = function(frame){
		this.currentSprite = frame;
	};
	
	/**
		Returns two points of topleft and bottomright coordinates
	*/
	this.getChoosableArea = function(){
		return {topLeft: {x: this.x, y: this.y}, bottomRight: {x: this.x + this.spriteSize.x, y: this.y + this.spriteSize.y}};
	};
	
	/**
		Paints the current sprite on screen
	*/
	this.paint = function(ctx){
		ctx.drawImage(this.img,
   			this.sprites[ this.currentSprite ].x,
			this.sprites[ this.currentSprite ].y,
			this.spriteSize.x,
			this.spriteSize.y,
			this.x,
			this.y,
			this.spriteSize.x,
			this.spriteSize.y);
		/*
		// Code to paint the border
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.spriteSize.x, this.y);
		ctx.lineTo(this.x + this.spriteSize.x, this.y + this.spriteSize.y);
		ctx.lineTo(this.x, this.y + this.spriteSize.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();*/
	};
};
