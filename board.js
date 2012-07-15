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

function compare(obj1, obj2) {
	return (obj1.y == obj2.y) ? 0 : (obj1.y < obj2.y) ? -1 : 1;
};

function Board(){
    this.x = 0;
	this.y = 0;
    this.sizeX = 2000;
    this.sizeY = 2000;
    
    this.movable = new Array;
    this.buildings = new Array;
	this.elements = new MinHeap(null, compare);
    var img = new Image;
    img.src = 'sprites/background/gravel_red.jpg';
    
	
	this.addTerrainProps = function(a){
		for(var k in a){
			if (a[k] instanceof Building){
				this.addBuilding(a[k]);
			}
		}
	}
	
    this.addMovable = function(m){
        this.movable.push(m);
		this.elements.push(m);
    };
    
    this.addBuilding = function(m){
        this.buildings.push(m);
		this.elements.push(m);
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
		// Update each movable object
		for (var i = 0; i < this.movable.length; i++){
                this.movable[i].update();
        }
	};
    
    // Captures mouse click event
    this.onclick = function(evt){
        //console.log("Button clicked in board");
        for (var obj in selector.selection){
            var scout = selector.selection[ obj ];
            //var coords = scout.middle();
            if (Math.abs(scout.x - evt.x) > 50 || Math.abs(scout.y - evt.y) > 50){
                var point = camera.localPosition({x: evt.x, y: evt.y});
                //scout.target = selector.targetPoint(scout.x, scout.y, point.x, point.y);
				scout.path = findPath([scout.x,scout.y],[point.x,point.y],terrainProps,40);
				scout.target = undefined;
            }
        };
		
		return false;
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
        // Paint tiles
        this.paintMap();

		// Paint according it's position on map...
		var tempHeap = new MinHeap(null, compare);
		while (this.elements.size() > 0){
			var element = this.elements.pop();
			element.paint(ctx);
			tempHeap.push(element);
		};
		this.elements = tempHeap;		
		
		PaintTile(mouse.tile_x,mouse.tile_y);
	};
	
	/**
		Checks if current board has been touched
	*/
	this.isTouched = function(point){
		return true;
	};
}

board = new Board;
