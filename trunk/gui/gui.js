function GUI(){
	this.paint = function(ctx){
        // Minimap
        minimap.paint(ctx);
        // Menu
        menu.paint(ctx);
        // Selection rectangle
		selector.paint(ctx);
	};
};

gui = new GUI();