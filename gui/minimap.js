function Minimap(){
    this.x = 0;
    this.y = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    
    this.refresh = function(){
        this.sizeX = canvas.width / 4;
        this.sizeY = canvas.height / 4;
        this.x = canvas.width - this.sizeX;
        this.y = canvas.height - this.sizeY;
    };
    
    this.paint = function(ctx){
        this.refresh();
        ctx.strokeStyle="black";
        var point = camera.localPosition({x:this.x, y:this.y});
		ctx.strokeRect(point.x, point.y, this.sizeX, this.sizeY);
	};
};

minimap = new Minimap;    