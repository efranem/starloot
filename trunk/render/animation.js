/**
 file - Name to image file to draw
 x - Origin x coord
 y - Origin y coord 
 size - [y:, y:] Number of pixels in each dimension of full sprite
 numFrames - [numX:, numY:] Number of frames in each dimension
 timeBetweenFrames - time between each couple of frames in ms
*/
function Animation(file, x, y, size, numFrames, timeBetweenFrames){
	/**
		Own properties
	*/
	this.currentSprite = 0;
	this.spriteSize = {x: size.x / numFrames, y: size.y};
	this.numFrames = numFrames;
	this.sprites = new Array;
    for (var i = 0; i < numFrames; i++){
        this.sprites.push( {x: this.spriteSize.x * i, y: this.spriteSize.y * 0} );
    };
	this.timeBetweenFrames = timeBetweenFrames || 40; // Updates each 40 ms (24 fps aprox)
	this.timePending = timeBetweenFrames;
	
	/**
		Drawable inheritance calling public constructor with parameters
	*/
	this.inherits( Drawable, file, x, y, this.spriteSize );
    
    /**
		Updates the current frame to draw
	*/
    this.updateCurrentFrame = function(timeElapsed){
        if (this.timeBetweenFrames > 0){
			this.timePending -= timeElapsed;
			if (this.timePending <= 0){
				var counter = 0;
				while (this.timePending <= 0){
					this.timePending += this.timeBetweenFrames;
					counter++;
				};				
				this.currentSprite += counter;
				this.currentSprite %= numFrames;
			};
        };
    };
};

/**
	Inheritance from Drawable
*/
Animation.prototype = new Drawable();
Animation.prototype.constuctor = Animation;

/**
    Override paint drawable method
*/
Animation.prototype.paint = function(ctx){
	Drawable.prototype.paint.call(this, ctx, 
						this.sprites[ this.currentSprite ].x, 
						this.sprites[ this.currentSprite ].y);
};

