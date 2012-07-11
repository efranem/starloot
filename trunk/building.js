var BuildingTypes = {
    RECON_HQ : 0,
    ANTENNA : 1,
	CRATER: 2,
	WALL: 3
};

function drawParalel(ctx, p1, p2, r) {
	var alpha = Math.PI - Math.atan2(p1[0] - p2[0],p1[1] - p2[1]);
	var a = [p1[0] + Math.cos(alpha)*r, p1[1] + Math.sin(alpha)*r/2];
	var b = [p2[0] + Math.cos(alpha)*r, p2[1] + Math.sin(alpha)*r/2];
	ctx.lineTo(a[0],a[1]);
	ctx.lineTo(b[0],b[1]);
}

function Building(type, x, y, orientation){
	this.x = x*128;
	this.y = y*64;
    this.orientation = orientation;
	this.img = new Image;
	switch (type) {
	case BuildingTypes.RECON_HQ:
		this.box = [[73,143],[121,167],[151,177],[176,184],[193,188],[222,172],[120,120]];
		// concave shit (still not implemented):
		//this.box = [[120,120],[222,172],[193,188],[176,184],[151,174],[150,168],[121,167],[73,143]];
		this.box = [[120,120],[222,172],[193,188],[176,184],[151,174],[121,167],[73,143]];
		this.img.src = 'sprites/buildings/recon_hq_01.png';	
		this.sprites = [
			[256*0,256*0],
			[256*0,256*1],
			[256*1,256*0],
			[256*1,256*1],
		];
		this.size = [256,256];
		this.center = [128,128];
	    break;
	case BuildingTypes.ANTENNA:
		this.box = [[55,475],[111,447],[168,475],[111,503]];
		this.img.src = 'sprites/buildings/antenna_01.png';
		this.sprites = [[0,0],[0,0],[0,0],[0,0]];
		this.size = [512,512];
		this.center = [111,475];
		break;
	case BuildingTypes.CRATER:
		this.box = [[306,43],[371,86],[399,103],[400,127],[385,148],[349,166],[295,202],[247,204],[207,190],[163,175],[144,168],[91,131],[124,99],[151,83],[220,40],[267,22]];
		this.img.src = 'sprites/decoration/crater_4x4.png';
		this.sprites = [[0,0],[0,0],[0,0],[0,0]];
		this.size = [512,256];
		this.center = [256,118];
		break;
	case BuildingTypes.WALL:
		this.box = [[81,121],[92,117],[175,160],[162,164]];
		this.img.src = 'sprites/buildings/wall_01.png';
		this.sprites = [[0,0],[0,0],[0,0],[0,0]];
		this.size = [256,256];
		this.center = [128,128];
		break;
	default:
		break;
	}
    
    this.middle = function(){
        return {x: this.x + (this.size[0] / 2),
                y: this.y + (this.size[1] / 2)
                };
    }
		
	this.paint = function(ctx){
		/* draw sprite */
        ctx.drawImage(this.img, this.sprites[this.orientation][0], this.sprites[this.orientation][1], this.size[0], this.size[1], this.x-this.center[0], this.y-this.center[1], this.size[0], this.size[1]);

        /* draw bounding box */
        ctx.strokeStyle="#AA6600";
        ctx.beginPath();
        var i = 0;
        while (i<this.box.length) {
        	ctx.lineTo(this.x+this.box[i][0]-this.center[0],this.y+this.box[i][1]-this.center[1]);
        	i++;
        }
		ctx.closePath();
		ctx.stroke();

		/* draw expanded bounding box */
		ctx.strokeStyle="#BB66BB";
		ctx.beginPath();
		i = 0;
		var r = 30; // the radius of the expansion (this will be the radius of the moving unit)
		while (i<this.box.length-1) {
			drawParalel(ctx, 
					[this.x - this.center[0] + this.box[i][0],this.y - this.center[1] + this.box[i][1]],
					[this.x - this.center[0] + this.box[i+1][0],this.y - this.center[1] + this.box[i+1][1]],
					r);
			i++;
		}
		drawParalel(ctx, 
				[this.x - this.center[0] + this.box[i][0],this.y - this.center[1] + this.box[i][1]],
				[this.x - this.center[0] + this.box[0][0],this.y - this.center[1] + this.box[0][1]],
				r);
		
		ctx.closePath();
		ctx.stroke();

	};
	
	this.update = function(){
	};
};