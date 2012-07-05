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
    MOUSE_MOVE : 6
};

function Mouse(){
    this.x = 0;
    this.y = 0; 
    this.button = "none";
    
    this.overAbles = [];
    this.outAbles = [];
    this.downAbles = [];
    this.UpAbles = [];
    this.clickAbles = [];
    this.doubleclickAbles = [];
    
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
        console.log("MouseOver");
    };
    
    this.mouseOut = function(){
        console.log("MouseOut");
    };
    
    this.mouseDown = function(evt){
        this.button = evt.button;
        evt.preventDefault();
        evt.stopPropagation();
        console.log("MouseDown " + this.button);
    };
    
    this.mouseUp = function(evt){
        this.button = evt.button;
        console.log("MouseUp " + this.button);
        this.button = 'none';
        for(var i in this.UpAbles)
        {
            this.UpAbles[i]();
        }        
        evt.preventDefault();
        evt.stopPropagation();        
    };
    
    this.mouseClick = function(evt){
        console.log("MouseClick");
    };
    
    this.mouseDoubleClick = function(evt){
        console.log("MouseDoubleClick");
    };
    
    this.mouseMoved = function(evt){
        console.log("MouseMoved");
        this.x = evt.clientX;
		this.y = evt.clientY;
    };
    
    this.mouseWheel = function(evt){
        console.log("MouseWheel " + (evt.wheelDelta / 120)); 
        evt.preventDefault();
        evt.stopPropagation();        
    };    
};

mouse = new Mouse;
