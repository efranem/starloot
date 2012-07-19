/**
 file - Name to id  of image file to draw
 x - Origin x coord
 y - Origin y coord
 size - [x: , y:] Size in pixels in each direction to draw
*/
function Drawable(file, x, y, size){
	this.img = document.getElementById(file);
	this.x = x;
	this.y = y;
	this.size = size;
    
    /**
		Set origin point to draw
	*/
    this.setOrigin = function(x, y){
        this.x = x;
        this.y = y;
    };
    
    /**
		Set size to draw
	*/
    this.setSize = function(X, Y){
        this.size = {x: X, y: Y};
    };
};

/**
	Returns true if custom pixel is visible and false if it is transparent
*/
Drawable.prototype.isPaintedPixel = function(pixel){
	// Let's see if it's inside the painted zone
	if (this.x > pixel.x || pixel.x > this.x + this.spriteSize.x ||
		this.y > pixel.y || pixel.y > this.y + this.spriteSize.y)
		return false;
	
	return true;
};

/**
	Paints the current sprite on screen
*/
Drawable.prototype.paint = function(ctx, offsetX, offsetY){
	if (this.img.complete)
		ctx.drawImage(this.img,
			offsetX,
			offsetY,
			this.size.x,
			this.size.y,
			this.x,
			this.y,
			this.size.x,
			this.size.y);
};
