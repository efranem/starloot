/**
	Group is meant to collide elements of same order in event priority
	This new method of event protocol uses hierachy and only one element
	will capture it (not working right now, only hierachy created)
	name - Name of the group of nodes
*/
function Group(name){
	this.name = name;
	this.groups = new Array;
	this.nodes = new Array;
	
	this.onkeyboardevent = function(event){
		var captured = false;
		for (var group in this.groups){
			if (this.groups[ group ].onkeyboardevent){
				captured = this.groups[ group ].onkeyboardevent(event);
				if (captured) return true;
			};
		};
		for (var node in this.nodes){
			if (this.nodes[ node ].onkeyboardevent){
				captured = this.nodes[ node ].onkeyboardevent(event);
				if (captured) return true;
			};
		}
		// Event has not been captured, so noone wanted it...
		return false;
	};
    
    this.onmouseevent = function(event){
		var captured = false;
		for (var group in this.groups){
			if (this.groups[ group ].onmouseevent){
				captured = this.groups[ group ].onmouseevent(event);
				if (captured) return true;
			};
		};
		for (var node in this.nodes){
			if (this.nodes[ node ].onmouseevent){
				captured = this.nodes[ node ].onmouseevent(event);
				if (captured) return true;
			};
		}
		// Event has not been captured, so noone wanted it...
		return false;
	};
	
	this.onevent = function(event){
		var captured = false;
		for (var group in this.groups){
			if (this.groups[ group ].onevent){
				captured = this.groups[ group ].onevent(event);
				if (captured) return true;
			};
		};
		for (var node in this.nodes){
			if (this.nodes[ node ].onevent){
				captured = this.nodes[ node ].onevent(event);
				if (captured) return true;
			};
		}
		// Event has not been captured, so noone wanted it...
		return false;
	};	
	
	this.addGroup = function(name){
		var appended = new Group(name);
		this.groups.push(appended);
		return appended;
	};
	
	this.removeGroup = function(name){
		var idx = 0;
		for (idx in this.groups){
			if (this.groups[ idx ].name == name)
				break;
		};
		if (idx != this.groups.length){
			this.groups.splice(idx, 1);
		}
		return this;
	};
    
    this.getGroup = function(name){
        var idx = 0;
		for (idx in this.groups){
			if (this.groups[ idx ].name == name)
				return this.groups[ idx ];
		};
		return undefined;
    };
    
	this.addNode = function(node){
		this.nodes.push(node);
		return this;
	};
	
	this.removeNode = function(obj){
		var idx = 0;
		for (idx in this.nodes){
			if (this.nodes[ idx ] == obj)
				break;
		};
		if (idx != this.nodes.length){
			this.nodes.splice(idx, 1);
		}
		return this;
	};
};