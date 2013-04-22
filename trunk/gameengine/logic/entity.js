/**
 * @author alkaitz
 */
function Entity(){
	var _nodes = new Array;

	this.addNode = function( node ){
		_nodes.push( node );
	};

	this.removeNode = function( node ){
		var index = _nodes.indexOf(node);
		if (index !== -1) {
			_nodes.splice(index, 1);
			return true;
		}
		else return false;
	};

	this.getNodes = function(){
		return _nodes;
	};

	this.update = function( timeElapsed ){
		for (var node in _nodes){
			_nodes[node].update( timeElapsed );
		};
	};
};

/**
 *	Paints the current entity on screen
 */
Entity.prototype.paint = function( ctx, scale ){
	var nodes = this.getNodes();
	for (var node in nodes){
		nodes[node].paint( ctx, scale );
	};
}