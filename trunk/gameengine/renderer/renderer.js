function Renderer(){
    var ctx = Config.getInstance().getContext();
	
    this.timeRendering = 0;

    // DELETE ME
    // Temp scale
    var _scale = 1.0;
    this.setScale = function(value){
        console.log(value);
        if ( value.delta == 1 ){ // positive wheel
            _scale += 0.05;
        } 
        else if ( value.delta == -1 ){ // Negative wheel
            _scale -= 0.05;
            if (_scale <= 0.0) _scale = 0.05;
        }
        console.log(_scale);
    };
    //////////////////////////////////////////////

    this.renderFrame = function(){
        // Start timing
        var time1 = new Date().getTime();
        
        // Restore from resize
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        //  DELETE ME
        for (var i = 0; i < entityArray.length; i++){
        	entityArray[i].paint( ctx, _scale );
        };
        /////////////
              
        this.timeRendering = new Date().getTime() - time1;
    };
};

renderer = new Renderer();