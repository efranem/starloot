function Renderer(){
    var ctx = Config.getInstance().getContext();
	
    this.timeRendering = 0;

    this.renderFrame = function(){
        // Start timing
        var time1 = new Date().getTime();
        
        // Restore from resize
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        //  DELETE ME
        for (var i = 0; i < nodeArray.length; i++){
        	var temp = nodeArray[i];
        	temp.paint( ctx );
        };
        /////////////
              
        this.timeRendering = new Date().getTime() - time1;
    };
};

renderer = new Renderer();