function gatherNodes(obstacles) {
	// Collect all nodes
	var nodes = new Array;
	var c = 0;
	for (var i = 0; i < obstacles.length; i++) {
		var b = obstacles[i].getBoundingBox(30);
		for (var j = 0; j < b.length; j++) {
			nodes.push(b[j]);
			c++;
		}
	}
	return nodes;
}

function paintGraph(ctx,nodes) {
	ctx.strokeStyle="#111166";
	ctx.lineWidth=0.1;
	var i=0;
	var j=1;
	while (i < nodes.length-1) {
		ctx.beginPath();
		ctx.lineTo(nodes[i][0],nodes[i][1]);
		ctx.lineTo(nodes[j][0],nodes[j][1]);
		ctx.closePath();
		ctx.stroke();
		j++;
		if (j == nodes.length) {
			i++;
			j = i+1;
		}
	}
	ctx.strokeStyle="#CCCCCC";
	ctx.lineWidth=1;
	for (var i = 0; i < nodes.length; i++) {
		x = nodes[i][0];
		y = nodes[i][1];
		ctx.beginPath();
		ctx.arc(x,y,2,0,Math.PI*2,true);
		ctx.closePath();
		ctx.stroke();
	}
	alert("Graph created");
}

