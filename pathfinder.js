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

function distance(a,b) {
	return 1;
}

// Adds two paths to the graph: a->b and b->a 
function addPath(graph,a,b) {
	// a and b are {hash:number, vertex:[x,y]}
	// calculate distance
	var d = 0;
	
	// store a->b
	if (a["hash"] in graph) {
		graph[a["hash"]][b["hash"]] = d;
	} else {
		graph[a["hash"]] = {};
		graph[a["hash"]]["vertex"] = a["vertex"];
		graph[a["hash"]][b["hash"]] = d;
	}
	// store b->a
	if (b["hash"] in graph) {
		graph[b["hash"]][a["hash"]] = d;
	} else {
		graph[b["hash"]] = {};
		graph[b["hash"]]["vertex"] = b["vertex"];
		graph[b["hash"]][a["hash"]] = d;
	}
}

// Add a path all around an obstacle
function addPerimeterPath(graph,nodes,count) {
	for (var i = 0; i < nodes.length-1; i++) {
		addPath(graph,{"hash":count+i,"vertex":nodes[i]},{"hash":count+i+1,"vertex":nodes[i+1]});
	}
	// close the loop
	addPath(graph,{"hash":count+i,"vertex":nodes[i]},{"hash":count,"vertex":nodes[0]});
}

// Check if a path a->b intersects with any obstacle, returns true if path is free
function checkPath(obstacles,a,b,r) {
	var x1 = a[0]; var y1 = a[1];
	var x2 = b[0]; var y2 = b[1];
	// note: intersections with obstacles that contain a or b (with self) are also to be checked
	for (var i=0; i<obstacles.length; i++) {
		var nodes = obstacles[i].getBoundingBox(r);
		for (var j=0; j<nodes.length; j++) {
			var v1 = nodes[j];
			var v2 = nodes[(j+1)%nodes.length];
			var x3 = v1[0]; var y3 = v1[1];
			var x4 = v2[0]; var y4 = v2[1];

			// Idea: http://stackoverflow.com/a/1968345
			var s1_x = x2 - x1; var s1_y = y2 - y1;
			var s2_x = x4 - x3; var s2_y = y4 - y3;

			var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y);
			var t = ( s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y);
			
			// Coindicing paths are OK (for now)
			if (s > 0 && s < 1 && t > 0 && t < 1) return false;
		}
	}
	return true;
}

// Create a navigation graph for path finding, using the given obstacles and radius r
function createGraph(obstacles,r) {
	var graph = {};
	// for each obstacle, add paths to the other obstacles
	var obs_A = 0;	// current obstacle
	var obs_B;		// another obstacle
	var current_node_count_A = 0;	// this is the node count for all the nodes before obs_A
	var current_node_count_B;		// this is the node count for all the nodes before obs_B
	// for each obstacle A
	while (obs_A < obstacles.length) {
		// TODO: don't add vertices that are inside other obstacles bouding boxes
		// (this happens when buildings are too close, or radius is too big
		
		// get all vertices
		var nodes_A = obstacles[obs_A].getBoundingBox(r);
		// add the perimeter (no intersecting with self paths)
		addPerimeterPath(graph,nodes_A,current_node_count_A);
		
		// add paths to the rest of the obstacles
		if (obs_A < obstacles.length) {
			// get first obstacle after A
			obs_B = obs_A+1;
			current_node_count_B = current_node_count_A + nodes_A.length;
			// now add all the following B obstacles
			while (obs_B < obstacles.length) {
				var nodes_B = obstacles[obs_B].getBoundingBox(r);
				// for each vertex in A, add a conexion to each vertex in B
				for (var i = 0; i < nodes_A.length; i++) {
					for (var j = 0; j < nodes_B.length; j++) {
						// check if path intersects something, if not, add it
						if (checkPath(obstacles,nodes_A[i],nodes_B[j],r)) {
							addPath(graph,{"hash":current_node_count_A+i,"vertex":nodes_A[i]},{"hash":current_node_count_B+j,"vertex":nodes_B[j]});
						}
					}
				}
				current_node_count_B += nodes_B.length;
				obs_B++;
			}
		}
		current_node_count_A += nodes_A.length;
		obs_A++;

	}

	// Paint graph
	ctx.strokeStyle = "#111166";
	ctx.lineWidth = 0.2;
	for (var key1 in graph) {
		var node1 = graph[key1];
		for (var key2 in node1) {
			var node2 = graph[key2];
			if (key2!="vertex") {
				ctx.beginPath();
				ctx.moveTo(node1["vertex"][0],node1["vertex"][1]);
				ctx.lineTo(node2["vertex"][0],node2["vertex"][1]);
				ctx.closePath();
				ctx.stroke();
			}
		}		
	}
	alert("Shit painted");
}