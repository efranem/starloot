function Keyboard(){
	this.keysPressed = new Array;
	
	this.keyDown = function (evt){
	    var contains = false;
	    for (var i = 0; i < this.keysPressed.length; i++)
	        if (this.keysPressed[i] == evt.keyCode)
	        {
	            contains = true;
	            break;
	        }
	    if (!contains)
	    {
	        this.keysPressed.push(evt.keyCode)
	    }
	}
	
	this.keyUp = function (evt){
	    var i = this.keysPressed.indexOf(evt.keyCode);
	    if (i != -1)
	        this.keysPressed.splice(i, 1);
	        
	}
	
	this.treatKeys = function (){
	   for (var i = 0; i < this.keysPressed.length; i++){
	        switch (this.keysPressed[ i ]) {
            case 87: /* W */
	        case 38: /* Up arrow was pressed */
	        	camera.transformY -= camera.CAMERA_SPEED;
	            break;
            case 83: /* S */
	        case 40: /* Down arrow was pressed */
	        	camera.transformY += camera.CAMERA_SPEED;
	            break;
            case 65: /* A */   
	        case 37: /* Left arrow was pressed */
	            camera.transformX -= camera.CAMERA_SPEED;
	            break;
            case 68: /* D */   
	        case 39: /* Right arrow was pressed */
	            camera.transformX += camera.CAMERA_SPEED;
	            break;
	        case 107: scout.rotate(0.18);break;
	        case 109:scout.rotate(-0.18);break;
	        }
	   }
	}
}

keyboard = new Keyboard;