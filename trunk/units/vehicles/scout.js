/**
 * @author alkaitz
 */
Scout.inherits( Node );
function Scout(x, y, name){
	/**
		Own properties
	*/
	this.angle = 0 * Math.PI/180;
	this.v = 2;
	this.target = undefined;
	this.path = new Array;
	
	/**
		Node inheritance calling public constructor with parameters
	*/
	this.inherits( Node, name, x, y, 32, {x: 1, y: 1}, 'recon_01_' );
	
	this.isSelected = false;	
	this.animSelected = new Animation('selector', 
    									this.getPosition().x - this.getOffsetDrawingZone().x, 
    									this.getPosition().y - this.getOffsetDrawingZone().y + 15, 
    									{x: 128, y: 128}, {x: 1, y: 1}, 0, false, false);
	
	this.update = function(){
		var position = this.getPosition();
		if (this.path != undefined && this.path.length > 0 && this.target == undefined) {
			this.target = this.path.splice(0,1)[0];
		}
		if (this.target != undefined && Math.abs(this.target.x - (position.x)) < 1.5 && Math.abs(this.target.y - (position.y)) < 1.5){
			this.target = undefined;
		}
		if (this.v!= 0 && this.target != undefined){
			var alpha = Math.atan2((this.target.y- (position.y)),(this.target.x - (position.x)));
			if (alpha < 0) alpha += 2 * Math.PI;
			else alpha %= 2 * Math.PI;
			//console.log("Alpha: "+(scout.angle/(Math.PI/180)).toFixed(2) +" degrees");
			var tempAngle = (2 * Math.PI) - alpha;		
            // First we turn to get correct direction and if we got the right direction we move
            if (Math.abs(tempAngle - this.angle) < 0.1){ // If the angle is correct we move
                this.angle = tempAngle;
                var x = Math.floor(position.x + Math.cos(alpha)*2.0);
                var y = Math.floor(position.y + Math.sin(alpha)*2.0);
                /*if (!collision(x,y)){*/
               	this.setPosition(x, y);
                    //this.x = x;
                    //this.y = y;
                /*}*/
            } else { // We turn
                if (direction(this.angle, tempAngle) == AngleDirection.COUNTER){
                    this.angle -= 0.075;
                    if (this.angle < 0) this.angle += (2 * Math.PI);
                }
                else {
                    this.angle += 0.075;
                    this.angle %= (2 * Math.PI);
                }
            }
			// Update painting data
			this.setCurrentAnimation( Math.round(this.angle / (11.25 * (Math.PI/180))) % 32 );
			var newPosition = this.getPosition();
			var offset = this.getOffsetDrawingZone();
			this.getCurrentAnimation().setOrigin(newPosition.x - offset.x, newPosition.y - offset.y );
			this.animSelected.setOrigin(newPosition.x - offset.x, newPosition.y - offset.y + 15);
		}
		if (this.isSelected){
            this.animSelected.show();
        }
        else{
            this.animSelected.hide();
        };       
	};
	
	/**
	 *	onMouseEvent callback event
	 */
	this.onclick = function(evt){
		var point = camera.localPosition({x: evt.x, y: evt.y});
		if (this.isSelected && !this.isTouched(point)){
			var position = this.getPosition();
            var point = camera.localPosition({x: evt.x, y: evt.y});
			this.path = findPath([position.x,position.y],[point.x,point.y],terrainProps,40);
			this.target = undefined;
			return false; // Not capturing as another element may have a new target as well
            
        }
        return false;
	};
	
	
	/**
		Checks if current scout has been touched
	*/
	this.isTouched = function(point){
		return this.getCurrentAnimation().isPaintedPixel(point);
	};
};

Scout.prototype.paint = function(ctx){
	if (this.isSelected == true){ // Paint selector graph
        this.animSelected.paint(ctx);
    }
    
	Node.prototype.paint.call(this, ctx);
};
