function Movable(obj){
    this.id = 0;
    this.name = "none";
    this.leftX = 0.0;
    this.topY = 0.0;
    this.rightX = 0.0;
    this.bottonY = 0.0;
    this.isSelected = true;
    var selectedImg = new Image;
    selectedImg.src = 'sprites/ui/selector.png';
    this.object = obj;
    
    this.overlap = function(other){
        area = (max(this.leftX, other.leftX) - min(this.rightX, other.rightX)) * (max(this.topY, other.topY) - min(this.bottomY, other.bottomY))
        return (area != 0);
    };
    
    this.paint = function(ctx){
        
        if (this.isSelected == true){
            ctx.drawImage(selectedImg, this.object.x, this.object.y+15);
        }
		this.object.paint(ctx);
    };
	
	this.update = function(){
		this.object.update();
	}
}

function PaintTile(row, col) {
	// Now paint something on a specific tile
	var tile = new Image;
	tile.src = 'sprites/ui/tile_green.png';
	var row_px = row*128;
	var col_px = col*32;
	if (col%2==0) {row_px+=64;}
        ctx.drawImage(tile, 0, 0, 128, 64, row_px, col_px, 128, 64);
}

function Board(){
    this.obstacles = new Array;
    this.movable = new Array;
    this.buildings = new Array;
    var img = new Image;
    img.src = 'sprites/background/gravel_red.jpg';
    
    this.addMovable = function(m){
        obj = new Movable(m);
        this.movable.push(obj);
    };
    
    this.addBuilding = function(m){
        this.buildings.push(m);
    };
    
    this.addObstacle = function(m){
        this.obstacles.push(m);
    };
    
    this.removeMovable = function(m){
        for (var i = 0; i < this.movable.length; i++){
            if (m == this.movable[ i ]){
                this.movable.splice(i, 1);
            }
        }
    };
    
    this.removeMovableId = function(id){
        for (var i = 0; i < this.movable.length; i++){
            if (id == this.movable[ i ].id){
                this.movable.splice(i, 1);
            }
        }
    };
    
    this.checkBounds = function(o){
        for (var i = 0; i < this.movable.length; i++){
            if (this.movable[ i ].overlap(o))
                return false;
        }
        return true;
    };
	
	this.updateLogic = function(){
		for (var i = 0; i < this.movable.length; i++){
                this.movable[i].update();
        }
	};
    
    this.paint = function(ctx){
//        ctx.save();
//        camera.applyTransforms(ctx); // Apply isometric view
            
        //A partir de aqu?, todo torcido 45?
        //ctx.fillStyle="#00FF00";
        //ctx.fillRect(0,0,c.width,c.height);
        
        // Paint tiles
        for (var i = 0; i < 2480; i += 256){
            for (var j = 0; j < 1280; j += 128){
                ctx.drawImage(img, i, j, 256, 128);
            }
        }

//        ctx.restore(); // Restore non-isometric view
        // Paint every movable component
        for (var i = 0; i < this.movable.length; i++){
                this.movable[i].paint(ctx);
        }
        // Paint every building
        for (var i = 0; i < this.buildings.length; i++){
                this.buildings[i].paint(ctx);
        }
        // Paint obstacles
        for (var i = 0; i < this.obstacles.length; i++){
                this.obstacles[i].paint(ctx);
        }

	PaintTile(5,5);
	PaintTile(6,5);
	PaintTile(5,6);
	PaintTile(5,4);
	
    };
}

board = new Board;
