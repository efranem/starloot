function Minimap(){
    this.x = 0;
    this.y = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    var img = new Image;
    img.src = 'sprites/background/gravel_red.jpg';
    
    this.refreshSize = function(){
        this.sizeX = canvas.width / 4;
        this.sizeY = canvas.height / 4;
        this.x = canvas.width - this.sizeX;
        this.y = canvas.height - this.sizeY;
    };
    
    this.paint = function(ctx){
        this.refreshSize();
        // Background
        ctx.fillStyle="black";
        var point = camera.localPosition({x:this.x, y:this.y});
		ctx.fillRect(point.x - 1, point.y - 1, this.sizeX, this.sizeY);
        // Tiles
        var tileWidth = 256 / 8;
		var tileHeight = 128 / 8;
		// Let's see where we have to paint...
		for (var i = point.x; i < point.x + this.sizeX; i += tileWidth){
            for (var j = point.y; j < point.y + this.sizeY; j += tileHeight){
                ctx.drawImage(img, i, j, 256 / 8, 128 / 8);
            }
        }
        // Let's paint every other component...
        /*for (var i = 0; i < board.movable.length; i++){
                board.movable[i].paint(ctx);
        }
        // Paint every building
        for (var i = 0; i < board.buildings.length; i++){
                board.buildings[i].paint(ctx);
        }
        // Paint obstacles
        for (var i = 0; i < board.obstacles.length; i++){
                board.obstacles[i].paint(ctx);
        }*/
        // Current view
        ctx.strokeStyle="green";
        var point = camera.localPosition({x:this.x, y:this.y});
        var startView = {x: point.x + ((camera.transformX / (camera.maxX + canvas.width)) * this.sizeX), y: point.y + ((camera.transformY / (camera.maxY + canvas.height)) * this.sizeY)};
        var sizeView = {sizeX: (canvas.width / camera.maxX) * this.sizeX, sizeY: (canvas.height / camera.maxY) * this.sizeY};
		ctx.strokeRect(startView.x, startView.y, sizeView.sizeX, sizeView.sizeY);
        //console.log("Position: " + startView.x + "," + startView.y);
        //console.log("Size: " + sizeView.sizeX + "," + sizeView.sizeY);
	};
};

minimap = new Minimap;    