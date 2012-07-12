function GUI(){
	this.paint = function(ctx){
        // Minimap
        minimap.paint(menuCtx);
        // Menu
        menu.paint(ctx);
        // Selection rectangle
		selector.paint(ctx);
	};
};

gui = new GUI();