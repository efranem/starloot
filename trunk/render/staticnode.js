/**
 * @author alkaitz
 * @param name Name of current node
 * @param x X coordinate of central point of node
 * @param y Y coordinate of central point of node
 * @param numAnimations number of different animations that node will have
 * @param numFrames [x:, y:] Number of frames in each dimension of graphic
 * @param files prefix of name of animation files 
 */
  StaticNode.inherits( Node );
 function StaticNode(name, x, y, numAnimations, numFrames, files){
	/**
		Node inheritance calling public constructor with parameters
	*/
	this.inherits( Node, name, x, y, numAnimations, numFrames, files );
 };