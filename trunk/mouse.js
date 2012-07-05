function Mouse(){
	this.x = 0;
	this.y = 0;
    this.button = 'none';
	this.targetX = 0;
	this.targetY = 0;
	this.leftClicked = false;
	this.rightClicked = false;
	
	this.mouseMoved = function(evt){
		this.x = evt.clientX;
		this.y = evt.clientY;
	}
	
	this.buttonPressed = function(button){
		this.leftClicked = false;
		this.rightClicked = false;
		this.targetX = this.x;
		this.targetY = this.y;
		switch (button){
		case 0: this.leftClicked = true; break;
		case 1: break;
		case 2: this.rightClicked = true; break;
		default: break;
		}
	}
    
    this.mouseUp = function(evt){
		this.buttonPressed(evt.button); // Save current value and reset
		this.button = 'none';
        evt.preventDefault();
        evt.stopPropagation();
    }
    
    this.mouseDown = function(evt){
        this.button = evt.button;
        evt.preventDefault();
        evt.stopPropagation();
    }
}

mouse = new Mouse;
