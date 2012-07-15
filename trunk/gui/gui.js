function GUI(){
	this.paint = function(ctx, menuCtx){
        // Minimap
        minimap.paint(menuCtx);
        // Menu
        menu.paint(menuCtx);
        // Selection rectangle
		selector.paint(ctx, menuCtx);
	};
};

gui = new GUI();