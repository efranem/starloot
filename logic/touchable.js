/**
 points - {topLeft: {x:, y:}, bottomRight: {x:, y:}} Points the delimitate the rectangle touchable
 */
function Touchable(points){
	this.topLeft = points.topLeft;
	this.bottomRight = points.bottomRight;
	
	/**
		Updates current area touchable
	*/
	this.updateTouchableArea = function(points){
		this.topLeft = points.topLeft;
		this.bottomRight = points.bottomRight;
	};
	
	/**
		Returns if the point is inside the touchable area
	*/
	this.hasTouchedIn = function(point){
		if (this.topLeft.x <= point.x && point.x <= this.bottomRight.x &&
			this.topLeft.y <= point.y && point.y <=this.bottomRight.y)
			return true;
		return false;
	};
};