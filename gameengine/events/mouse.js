var MouseButtons = {
    0 : 'left',
    1 : 'middle',
    2 : 'right',
    3 : 'none'
};

var MouseEvents = {
    0 : 'mouseover',
    1 : 'mouseout',
    2 : 'mousedown',
    3 : 'mouseup',
    4 : 'click',
    5 : 'doubleclick',
    6 : 'mousemove',
    7 : 'mousewheel',
    8 : 'mouseslide'
};

function Mouse(){
    var _position = new Coordinate2D(0, 0);
    var _pressedOrigin = new Coordinate2D(0, 0);
    var _button = "none";

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
    
    this.mouseOver = function(evt){ // Should not get out the canvas (or we do not worry about it)
    };
    
    this.mouseOut = function(){ // Should not get out the canvas (or we do not worry about it)
    };
    
    this.mouseDown = function(evt){
         _position = new Coordinate2D( evt.x, evt.y ); 
        _pressedOrigin = new Coordinate2D( evt.x, evt.y );
        _button = MouseButtons[ evt.button ];
        console.log( 'Press down', _pressedOrigin, _button);
        evt.preventDefault();
        evt.stopPropagation();
    };
    
    this.mouseUp = function(evt){
         _position = new Coordinate2D( evt.x, evt.y ); 
        var pressedDown = new Coordinate2D( evt.x, evt.y );
        var button = MouseButtons[ evt.button ];
        console.log( 'Press up', pressedDown, button);
        _button = "none";
        evt.preventDefault();
        evt.stopPropagation();        
    };
    
    this.mouseClick = function(evt){
        _position = new Coordinate2D( evt.x, evt.y ); 
        var pressedDown = new Coordinate2D( evt.x, evt.y );
        var button = MouseButtons[ evt.button ];
        console.log( 'Click', pressedDown, button);
        _button = "none";
    };
    
    this.mouseDoubleClick = function(evt){
        _position = new Coordinate2D( evt.x, evt.y ); 
        var pressedDown = new Coordinate2D( evt.x, evt.y );
        var button = MouseButtons[ evt.button ];
        console.log( 'Double Click', pressedDown, button);
        _button = "none";
    };
    
    this.mouseMoved = function(evt){
        _position = new Coordinate2D( evt.x, evt.y ); 
        console.log( 'Move', _position);
    };    
	
    this.mouseWheel = function(evt){
		evt.preventDefault();
        evt.stopPropagation();        
    };   
};

mouse = new Mouse;
