var MouseButtons = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

var MouseEvents = {
    MOUSE_OVER : 0,
    MOUSE_OUT : 1,
    MOUSE_DOWN : 2,
    MOUSE_UP : 3,
    CLICK : 4,
    DOUBLE_CLICK : 5,
    MOUSE_MOVE : 6,
    WHEEL:  7,
	MOUSE_SLIDE: 8
};

function Mouse(){
    this.x = 0;
    this.y = 0;
	this.lastX = 0;
	this.lastY = 0;
    this.tile_x = 0;
    this.tile_y = 0;
    this.button = "none";
	this.buttondown = false;
	this.originDown_x = 0;
	this.originDown_y = 0;
	this.epsilonSlide = 10;
    
    this.overAbles = new Array;
    this.outAbles = new Array;
    this.downAbles = new Array;
    this.upAbles = new Array;
    this.clickAbles = new Array;
    this.doubleclickAbles = new Array;
    this.wheelAbles = new Array;
	this.slideAbles = new Array;
    
    this.init = function(){
        window.onmouseover      = function(evt){mouse.mouseOver(evt);};
        window.onmouseout       = function(evy){mouse.mouseOut();};
        window.onmousedown      = function(evt){mouse.mouseDown(evt);};
        window.onmouseup        = function(evt){mouse.mouseUp(evt);};
        window.onclick          = function(evt){mouse.mouseClick(evt);};
        window.ondoubleclick    = function(evt){mouse.mouseDoubleClick(evt);};
        window.onmousemove      = function(evt){mouse.mouseMoved(evt);};
        window.onmousewheel     = function(evt){mouse.mouseWheel(evt);};
        window.oncontextmenu    = function(evt){return false;}; // Disable right-click context menu*/
		window.ontouchstart     = function(evt){mouse.mouseDown(evt);};
		window.ontouchend       = function(evt){mouse.mouseUp(evt);};
		window.ontouchmove      = function(evt){mouse.mouseMoved(evt);};
	};
    
    this.mouseOver = function(evt){
        for(var i in this.overAbles)
        {
            var object = this.overAbles[ i ][ 0 ];
            var callback = this.overAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback]();
            else
                callback();
        }
    };
    
    this.mouseOut = function(){
        for(var i in this.outAbles)
        {
            var object = this.outAbles[ i ][ 0 ];
            var callback = this.outAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback]();
            else
                callback();
        }
    };
    
    this.mouseDown = function(evt){
        this.button = evt.button;
        for(var i in this.downAbles)
        {
            var object = this.downAbles[ i ][ 0 ];
            var callback = this.downAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback](this.button);
            else
                callback(this.button);
        }
		this.lastX = this.x;
		this.lastY = this.y;
		this.originDown_x = this.x;
		this.originDown_y = this.y;
		this.buttondown = true;
        evt.preventDefault();
        evt.stopPropagation();
    };
    
    this.mouseUp = function(evt){
        this.button = evt.button;
        for(var i in this.upAbles)
        {
            var object = this.upAbles[ i ][ 0 ];
            var callback = this.upAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback](this.button);
            else
                callback(this.button);
        }
		this.button = 'none';
		this.buttondown = false;
        evt.preventDefault();
        evt.stopPropagation();        
    };
    
    this.mouseClick = function(evt){
        this.button = evt.button;
        for(var i in this.clickAbles)
        {
            var object = this.clickAbles[ i ][ 0 ];
            var callback = this.clickAbles[ i ][ 1 ];
            if (object != undefined){
                 if (object.x - camera.transformX < this.x && this.x < object.x + object.sizeX - camera.transformX &&
                    object.y - camera.transformY < this.y && this.y < object.y + object.sizeY - camera.transformY)
                    object[callback](this.button);
            }
            else
                callback(this.button);
        } 
    };
    
    this.mouseDoubleClick = function(evt){
        this.button = evt.button;
        for(var i in this.doubleclickAbles)
        {
            var object = this.doubleclickAbles[ i ][ 0 ];
            var callback = this.doubleclickAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback](this.button);
            else
                callback(this.button);
        }
        console.log("MouseDoubleClick");
    };
    
    this.mouseMoved = function(evt){
        //console.log("MouseMoved");
        this.x = evt.clientX;
		this.y = evt.clientY;
		// Find corresponding grid tile
		m_x = (evt.clientX + camera.transformX)%64;
		m_y = (evt.clientY + camera.transformY)%32;
		this.tile_x = Math.floor((evt.clientX + camera.transformX) / 64);
		this.tile_y = Math.floor((evt.clientY + camera.transformY) / 32);
		if (this.tile_x%2 == this.tile_y%2) {
			if (m_x + (m_y*2)>64) {this.tile_x++; this.tile_y++;}
		} else {
			if (-m_x + (m_y*2)<0) {this.tile_x++;}
			else {this.tile_y++;}
		}
		
		if (this.buttondown == true){
			var localSlidedX = this.x - this.lastX;
			var localSlidedY = this.y - this.lastY;
			var globalSlideX = this.x - this.originDown_x;
			var globalSlideY = this.y - this.originDown_y;
			if (Math.abs(localSlidedX) > this.epsilonSlide ||  Math.abs(localSlidedY) > this.epsilonSlide){
				for(var i in this.slideAbles)
				{
					var object = this.slideAbles[ i ][ 0 ];
					var callback = this.slideAbles[ i ][ 1 ];
					if (object != undefined)
						object[callback](this.button, localSlidedX, localSlidedY, globalSlideX, globalSlideY);
					else
						callback(this.button, localSlidedX, localSlidedY, globalSlideX, globalSlideY);
				};
				this.lastX = this.x;
				this.lastY = this.y;
			};
		};
    };    
	
    this.mouseWheel = function(evt){
        //console.log("MouseWheel " + (evt.wheelDelta / 120)); 
        for(var i in this.wheelAbles)
        {
            var object = this.wheelAbles[ i ][ 0 ];
            var callback = this.wheelAbles[ i ][ 1 ];
            if (object != undefined)
                object[callback](evt.wheelDelta);
            else
                callback(evt.wheelDelta);
        }
        evt.preventDefault();
        evt.stopPropagation();        
    };   

    this.addEventListener = function (event, object, callback){
        switch (event){
            case MouseEvents.MOUSE_OVER:    this.overAbles.push([object, callback]);       break;
            case MouseEvents.MOUSE_OUT:     this.outAbles.push([object, callback]);        break;
            case MouseEvents.MOUSE_DOWN:    this.downAbles.push([object, callback]);       break;
            case MouseEvents.MOUSE_UP:      this.upAbles.push([object, callback]);         break;
            case MouseEvents.CLICK:         this.clickAbles.push([object, callback]);      break;
            case MouseEvents.DOUBLE_CLICK:  this.doubleclickAbles.push([object, callback]);break;
            case MouseEvents.MOUSE_MOVE:    break;
            case MouseEvents.WHEEL:         this.wheelAbles.push([object, callback]);      break;
			case MouseEvents.MOUSE_SLIDE:   this.slideAbles.push([object, callback]);      break;
            default:    return false;
        };
    };    
	
	this.removeEventListener = function (event, object, callback){
		var list;
		switch (event){
            case MouseEvents.MOUSE_OVER:    list = this.overAbles;	     break;
            case MouseEvents.MOUSE_OUT:     list = this.outAbles;	     break;
            case MouseEvents.MOUSE_DOWN:    list = this.downAbles;       break;
            case MouseEvents.MOUSE_UP:      list = this.upAbles;         break;
            case MouseEvents.CLICK:         list = this.clickAbles;      break;
            case MouseEvents.DOUBLE_CLICK:  list = this.doubleclickAbles;break;
            case MouseEvents.MOUSE_MOVE:    list = [];			  		 break;
            case MouseEvents.WHEEL:         list = this.wheelAbles;      break;
			case MouseEvents.MOUSE_SLIDE:   list = this.slideAbles;      break;
            default:    return false;
        };
		var idx = indexPair( [object, callback], list);
		if (idx != -1){
			switch (event){
				case MouseEvents.MOUSE_OVER:    this.overAbles.splice(idx, 1);	      break;
				case MouseEvents.MOUSE_OUT:     this.outAbles.splice(idx, 1);	      break;
				case MouseEvents.MOUSE_DOWN:    this.downAbles.splice(idx, 1);        break;
				case MouseEvents.MOUSE_UP:      this.upAbles.splice(idx, 1);          break;
				case MouseEvents.CLICK:         this.clickAbles.splice(idx, 1);       break;
				case MouseEvents.DOUBLE_CLICK:  this.doubleclickAbles.splice(idx, 1); break;
				case MouseEvents.MOUSE_MOVE:    			  		 			      break;
				case MouseEvents.WHEEL:         this.wheelAbles.splice(idx, 1);       break;
				case MouseEvents.MOUSE_SLIDE:   this.slideAbles.splice(idx, 1);       break;
				default: console.warn("Mouse::removeEventListener: callback " + callback + " not existing in " + object + "." + event); break;			
			};
		}	
		else{
			console.warn("Mouse::removeEventListener: Trying to remove " + event + " event with " + object + "." + callback);			
		};
	};
};

mouse = new Mouse;
