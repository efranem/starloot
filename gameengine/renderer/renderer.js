anim = new Animation('reconn', new Size2D(1024,512), new Size2D( 8, 4));
anim.show();
anim.play();

function Renderer(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
    this.timeRendering = 0;

    this.renderFrame = function(){
        // Start timing
        var time1 = new Date().getTime();
        
        // Restore from resize
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        anim.updateCurrentFrame( 10 );
        anim.paint( ctx, new Coordinate2D(0,0) );
              
        this.timeRendering = new Date().getTime() - time1;
    };
};

renderer = new Renderer();