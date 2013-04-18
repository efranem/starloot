function Renderer(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
    this.timeRendering = 0;


	//  DELETE ME
    var nodeArray = new Array;

    for (var j = 0; j < 10; j++){
    	for (var i = 0; i < 14; i++){
			var node = new Node('scout' + i + '-' + j, (i * 128) + 64, (j * 128) + 16, 1, new Size2D(8, 4), new Size2D(128, 128), ['reconn']);
			node.play();
			nodeArray.push( node );
		};
    }
	/////////////


    this.renderFrame = function(){
        // Start timing
        var time1 = new Date().getTime();
        
        // Restore from resize
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        //  DELETE ME
        for (var i = 0; i < nodeArray.length; i++){
        	var temp = nodeArray[i];
        	temp.update( 20 );
        	temp.paint( ctx );
        };
        /////////////
              
        this.timeRendering = new Date().getTime() - time1;
    };
};

renderer = new Renderer();