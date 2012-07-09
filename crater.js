function Crater(x, y){
	this.x = x;
	this.y = y;
    this.sizeX = 512;
    this.sizeY = 256;
	this.dim = [2,1.5];
	this.img = new Image;
	this.img.src = 'sprites/decoration/crater_4x4.png';
	this.paint = function(ctx){
        ctx.drawImage(this.img, 0, 0, 512, 256, this.x-256, this.y-128, 512, 256);
		ctx.strokeStyle="red";
		var cdx = (this.dim[0]*128)/2;
		var cdy = (this.dim[1]*128)/2;
		ctx.strokeRect(this.x-cdx,this.y-cdy,cdx*2,cdy*2);
		ctx.fillStyle="#FF0000";
		ctx.beginPath();
		ctx.arc(this.x,this.y,15,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	};
	this.update = function(){
	};
    
    this.middle = function(){
        return {x: this.x + (this.sizeX / 2),
                y: this.y + (this.sizeY / 2)
                };
    }
};
