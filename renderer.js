function clear(ctx){
	// Espacio 'normal' horizontal
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);
};

function debugData(ctx){
    ctx.fillStyle="#FFFFFF";
	ctx.font = "bold 14px sans-serif";
	ctx.fillText("Mouse: ("+mouse.x + ","+mouse.y+")",10,20);
	ctx.fillText("Tile: ("+mouse.tile_x + ","+mouse.tile_y+")",140,20);
    if (mouse.button != "none")
        ctx.fillText("MouseButton: "+mouse.button+" pressed", 10, 40);
    else
        ctx.fillText("MouseButton: idle", 10, 40);
    ctx.fillText("Keys: "+keyboard.keysPressed,10,60);
    ctx.fillText("FPS: "+fps.fpsVal.toFixed(2)+" fps",10,80);
    ctx.fillText("Sprite: "+scout.sprite,10,110);
    ctx.fillText("Angle: "+(scout.angle/(Math.PI/180)),10,130);
    ctx.fillText("Camera: "+camera.transformX+","+camera.transformY,10,150);
	ctx.fillText("Target: "+(scout.target == undefined ? "undefined" : scout.target.x+","+scout.target.y),10,170);
};

function renderFrame(){
    // Restore from resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    clear(ctx);
	ctx.save()
    ctx.translate(-camera.transformX,-camera.transformY);
	board.paint(ctx);
    ctx.restore();
	debugData(ctx); // Print usefull data
};