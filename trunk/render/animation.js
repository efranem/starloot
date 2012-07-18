function Animation(file, x, y, numFrames, timeBetweenFrames){
    this.img = document.getElementById(file);
    this.currentSprite = 0;
	this.spriteSize = {x: size.pX / numFrames, y: size.pY};
    this.x = x - (this.spriteSize.x / 2); // x is the origin of drawing
	this.y = y - (this.spriteSize.y / 2); // y is the origin of drawing
    this.numFrames = numFrames;
    this.sprites = new Array;
    for (var i = 0; i < this.numFrames; i++){
        this.sprites.push( {x: this.spriteSize.x * i, y: this.spriteSize.y} );
    };
    this.timeBetweenFrames = timeBetweenFrames || 40; // Updates each 40 ms (24 fps aprox)
    
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
		Updates the current frame to draw
	*/
    this.updateCurrentFrame = function(timeElapsed){
        if (this.timeBetweenFrames > 0){
            var framesElapsed = Math.floor(timeElapsed / this.timeBetweenFrames);
            this.currentSprite += framesElapsed;
            this.currentSprite %= numFrames;
        };
    };
};

/**
    Paints the current sprite on screen
*/
Animation.prototype.paint = function(ctx){
    ctx.drawImage(this.img,
   			this.sprites[ this.currentSprite ].x,
			this.sprites[ this.currentSprite ].y,
			this.spriteSize.x,
			this.spriteSize.y,
			this.x,
			this.y,
			this.spriteSize.x,
			this.spriteSize.y);
};

/**
    Returns true if custom pixel is visible and false if it is transparent
*/
Animation.prototype.isPaintedPixel = function(pixel){
    // Let's see if it's inside the painted zone
    if (this.x > pixel.x || pixel.x > this.x + this.spriteSize.x ||
        this.y > pixel.y || pixel.y > this.y + this.spriteSize.y)
        return false;
    
    return true;
};
