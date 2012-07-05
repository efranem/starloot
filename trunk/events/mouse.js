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
    WHEEL:  7
};

function Mouse(){
    this.x = 0;
    this.y = 0; 
    this.button = "none";
    
    this.overAbles = [];
    this.outAbles = [];
    this.downAbles = [];
    this.upAbles = [];
    this.clickAbles = [];
    this.doubleclickAbles = [];
    this.wheelAbles = [];
    
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
    };
    
    this.mouseOver = function(evt){
        for(var i in this.overAbles)
        {
            this.overAbles[i]();
        }
    };
    
    this.mouseOut = function(){
        for(var i in this.outAbles)
        {
            this.outAbles[i]();
        }
    };
    
    this.mouseDown = function(evt){
        this.button = evt.button;
        for(var i in this.downAbles)
        {
            this.downAbles[i]( this.button );
        }
        evt.preventDefault();
        evt.stopPropagation();
    };
    
    this.mouseUp = function(evt){
        this.button = evt.button;
        for(var i in this.upAbles)
        {
            this.upAbles[i]( this.button );
        }
        this.button = 'none';
        evt.preventDefault();
        evt.stopPropagation();        
    };
    
    this.mouseClick = function(evt){
        this.button = evt.button;
        for(var i in this.clickAbles)
        {
            this.clickAbles[i]( this.button );
        } 
    };
    
    this.mouseDoubleClick = function(evt){
        this.button = evt.button;
        for(var i in this.doubleclickAbles)
        {
            this.doubleclickAbles[i]( this.button );
        }
        console.log("MouseDoubleClick");
    };
    
    this.mouseMoved = function(evt){
        //console.log("MouseMoved");
        this.x = evt.clientX;
		this.y = evt.clientY;
    };
    
    this.mouseWheel = function(evt){
        //console.log("MouseWheel " + (evt.wheelDelta / 120)); 
        for(var i in this.wheelAbles)
        {
            this.wheelAbles[i]( evt.wheelDelta );
        }
        evt.preventDefault();
        evt.stopPropagation();        
    };   

    this.addEventListener = function (event, callback){
        switch (event){
            case MouseEvents.MOUSE_OVER:    this.overAbles.push(callback);       break;
            case MouseEvents.MOUSE_OUT:     this.outAbles.push(callback);        break;
            case MouseEvents.MOUSE_DOWN:    this.downAbles.push(callback);       break;
            case MouseEvents.MOUSE_UP:      this.upAbles.push(callback);         break;
            case MouseEvents.CLICK:         this.clickAbles.push(callback);      break;
            case MouseEvents.DOUBLE_CLICK:  this.doubleclickAbles.push(callback);break;
            case MouseEvents.MOUSE_MOVE:    break;
            case MouseEvents.WHEEL:         this.wheelAbles.push(callback);      break;
            default:    return false;
        };
    };    
};

mouse = new Mouse;
