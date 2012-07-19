/**
 file - Name to image file to draw
 x - Origin x coord
 y - Origin y coord 
 size - [x:, y:] Number of pixels in each dimension of full sprite
 numFrames - [numX:, numY:] Number of frames in each dimension
 timeBetweenFrames - time between each couple of frames in ms
 visible - true if the animation is shown by default
 play - true or false if animation should start playing by default
*/
Animation.inherits( Drawable );
function Animation(file, x, y, size, numFrames, timeBetweenFrames, visible, play){
	/**
		Own properties
	*/
	this.currentFrame = 0;
	this.spriteSize = {x: size.x / numFrames, y: size.y};
	this.numFrames = numFrames;
	this.sprites = new Array;
    for (var i = 0; i < numFrames; i++){
        this.sprites.push( {x: this.spriteSize.x * i, y: this.spriteSize.y * 0} );
    };
	this.timeBetweenFrames = timeBetweenFrames || 40; // Updates each 40 ms (24 fps aprox)
	this.timePending = timeBetweenFrames;
    this.isPlaying = play || false;
    this.isVisible = visible || false;
	
	/**
		Drawable inheritance calling public constructor with parameters
	*/
	this.inherits( Drawable, file, x, y, this.spriteSize );
    
    /**
		Set current animation frame
	*/
    this.setCurrentFrame = function(newFrame){
        this.currentFrame = newFrame;
    };
    
    /**
		Get current animation's frame
	*/
    this.getCurrentFrame = function(){
        return this.currentFrame;
    };
    
    /**
		Start playing animation from current frame
	*/
    this.play = function(){
        this.isPlaying = true;
        this.timePending = timeBetweenFrames;
    };
    
    /**
		Stop playing animation
	*/
    this.stop = function(){
        this.isPlaying = false;
    };
    
    /**
		Get the number of frames of the animation
	*/
    this.getNumFrames = function(){
        return ( this.numFrames.numX * this.numFrames.numY );
    };
    
    /**
		Shows the animation frame
	*/
    this.show = function(){
        this.isVisible = true;
    };
    
    /**
		Hides the animation
	*/
    this.hide = function(){
        this.isVisible = false;
    };
    
    /**
		Updates the current frame to draw
	*/
    this.updateCurrentFrame = function(timeElapsed){
        if (this.isPlaying && this.timeBetweenFrames > 0){
			this.timePending -= timeElapsed;
			if (this.timePending <= 0){
				var counter = 0;
				while (this.timePending <= 0){
					this.timePending += this.timeBetweenFrames;
					counter++;
				};				
				this.currentFrame += counter;
				this.currentFrame %= numFrames;
			};
        };
    };
};

/**
    Override paint drawable method
*/
Animation.prototype.paint = function(ctx){
    if (this.isVisible)
        Drawable.prototype.paint.call(this, ctx, 
                            this.sprites[ this.currentFrame ].x, 
                            this.sprites[ this.currentFrame ].y);
};

