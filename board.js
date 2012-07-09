/*function Movable(obj){
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
}*/

function PaintTile(row, col) {
	// Now paint something on a specific tile
	if ((row+col) % 2 == 0) {
		var tile = new Image;
		tile.src = 'sprites/ui/tile_green.png';
		var row_px = row*64;
		var col_px = col*32;
		ctx.drawImage(tile, row_px-64, col_px-32);
	}

}

function Board(){
    this.x = 0;
	this.y = 0;
    this.sizeX = 2000;
    this.sizeY = 2000;
    
    this.obstacles = new Array;
    this.movable = new Array;
    this.buildings = new Array;
    var img = new Image;
    img.src = 'sprites/background/gravel_red.jpg';
    
	
	this.addTerrainProps = function(a){
		for(var k in a){
			if (a[k] instanceof Building){
				this.addBuilding(a[k]);
			}
			if (a[k] instanceof Wall || a[k] instanceof Crater){
				this.addObstacle(a[k]);
			}
		}
	}
	
    this.addMovable = function(m){
        //obj = new Movable(m);
        this.movable.push(m);
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
    
    // Captures mouse click event
    this.onclick = function(){
        console.log("Button clicked in board");
        for (var obj in selector.selection){
            var scout = selector.selection[ obj ];
            var coords = scout.middle();
            if (Math.abs(coords[0] - mouse.x) > 50 || Math.abs(coords[1] - mouse.y) > 50){
                var point = camera.localPosition({x: mouse.x, y: mouse.y});
                scout.target = selector.targetPoint(scout.x, scout.y, point.x, point.y);
            }
        };
    };
    
    // Captures keyboard key pressed
    this.onkeyboarddown = function(key){
        switch (key) {
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
        case 107: scout1.rotate(0.18);break;
        case 109:scout1.rotate(-0.18);break;
        }
    };
	
	this.paintMap = function(){
		var tileWidth = 256;
		var tileHeight = 128;
		// Let's see where we have to paint...
		var startTileX = Math.floor(camera.transformX / tileWidth) * tileWidth;
		var startTileY = Math.floor(camera.transformY / tileHeight) * tileHeight;
		for (var i = startTileX; i < startTileX + canvas.width + tileWidth; i += tileWidth){
            for (var j = startTileY; j < startTileY + canvas.height + tileHeight; j += tileHeight){
                ctx.drawImage(img, i, j, 256, 128);
            }
        }
	};
    
    this.paint = function(ctx){
//        ctx.save();
//        camera.applyTransforms(ctx); // Apply isometric view
            
        //A partir de aqu?, todo torcido 45?
        //ctx.fillStyle="#00FF00";
        //ctx.fillRect(0,0,c.width,c.height);
        
        // Paint tiles
        this.paintMap();

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

		PaintTile(0,0);
		PaintTile(1,0);
		PaintTile(2,0);
		PaintTile(3,0);
		PaintTile(4,0);
		PaintTile(5,0);
		PaintTile(5,1);
		//PaintTile(0,1);
		PaintTile(mouse.tile_x,mouse.tile_y);
	};
}

board = new Board;
