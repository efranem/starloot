/**
 * @author alkaitz
 * @param name Name of current node
 * @param x X position coordinate of the node
 * @param y Y position coordinate of the node
 * @param numAnimations number of different animations that node will have
 * @param numFrames {x:, y:} Number of frames in each dimension of graphic
 * @param sizeOfSprites {x:, y:} Size of each independent sprite
 * @param files lanimations list 
 */
function Node(name, x, y, numAnimations, numFrames, sizeOfSprites, files){
	/**
		Own properties
	*/
	var _name = name;
	var _position = new Coordinate2D(x, y) || new Coordinate2D(0, 0);
	var _sizeOfSprite = sizeOfSprites || {x: 128, y: 128}; // Default sprite to 128 pixels
    var _offsetDrawingZone = new Coordinate2D( Math.floor( _sizeOfSprite.x / 2 ),Math.floor( _sizeOfSprite.y / 2 ) )
    var _currentAnimation = 0;
	var _animations = new Array;
	var _numAnimations = numAnimations; 
	for (var idx = 0; idx < _numAnimations; idx++){
		_animations.push(new Animation(files[ idx ], {x: _sizeOfSprite.x * numFrames.x, y: _sizeOfSprite.y * numFrames.y}, numFrames, 0, true, false));
    };
    
	/**
	 * Name getter
	 * Type: String
	 */
    this.getName = function(){
    	return _name;
    };
    
	/**
	 * Position getter and setter
	 * Type: {x, y}
	 */
    this.setPosition = function( position ){
    	_position = position;
    };
    
    this.getPosition = function(){
    	return _position;
    };
    
	/**
	 * CurrentAnimation getter and setter
	 * Type: Animation
	 */
    this.setCurrentAnimation = function(currentFrame){
    	_currentAnimation = currentFrame;
    };
    
    this.getCurrentAnimation = function(){
    	return _animations[ _currentAnimation ];
    };

    /**
     * Current animation start and stop
     */
    this.play = function(){
    	_animations[ _currentAnimation ].play();
    };

    this.stop = function(){
    	_animations[ _currentAnimation ].stop();
    };
    
	/**
	 * OffsetDrawingZone getter
	 * Type: {x, y}
	 */
    this.getOffsetDrawingZone = function(){
    	return _offsetDrawingZone;
    };
    
    /**
	 * Size getter
	 * Type: {x, y}
	 */
	this.getSize = function(){
    	return _sizeOfSprite;
    };


    /**
	 * Update functions
	 * timeElapsed in milliseconds
	 */
    this.update = function( timeElapsed ){
    	_animations[ _currentAnimation ].updateCurrentFrame( timeElapsed );
    };
};

/**
 *	Paints the current scout on screen
 */
Node.prototype.paint = function( ctx ){
	var currentAnimation = this.getCurrentAnimation();
	var nodePosition = this.getPosition();
	var offset = this.getOffsetDrawingZone();
	var origin = { x: nodePosition.x - offset.x, y: nodePosition.y - offset.y };
	currentAnimation.paint(ctx, origin);
}