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
	
	this.onevent = function(type, event){
		var captured = false;
		for (var group in this.groups){
			if (this.groups[ group ].onevent){
				captured = this.groups[ group ].onevent(type, event);
				if (captured) return true;
			};
		};
		for (var node in this.nodes){
			if (this.nodes[ node ][type]){
				captured = this.nodes[ node ][ type ](event);
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