function EventManager(){
	var _eventsTable = {};
	
	this.init = function(){
		_eventsTable['keyboard'] = {};
		_eventsTable['mouse'] = {};
		_eventsTable['touch'] = {};
		_eventsTable['timers'] = new Array;
		_eventsTable['custom'] = {};
		Game.keyboard.init(_eventsTable['keyboard']);
		Game.mouse.init(_eventsTable['mouse']);
		Game.touch.init(_eventsTable['touch']);
	};

	this.addTimer = function( timeout, callback ){
		var timer = new Timer(timeout, callback);
		_eventsTable['timers'].push( timer );
		return timer;
	};

	this.update = function( elapsedTime ){
		var timers = _eventsTable['timers'];
		for (var timer in timers){
			timers[timer].update( elapsedTime );
			if (timers[timer].hasFinished() == true){
				delete timers[timer];
			}
		};

		// TODO Implement custom events (software ones )
	};

	this.addListener = function( device, evt, callback ){
		if (device && evt && _eventsTable[device]){
			var m_device = _eventsTable[device];
			if ( m_device[ evt ] == undefined ){
				m_device[ evt ] = new Array;
			}
			m_device[evt].push( callback );
			return true;
		}
		else
			return false;
	};

	this.removeListener = function( device, evt, callback ){
		if (device && evt && _eventsTable[device]){
			var m_device = _eventsTable[device];
			var m_evt = m_device[evt];
			var index = m_evt.indexOf(callback);
			if (index !== -1) {
 				m_evt.splice(index, 1);
 				return true;
			}
			return false;
		}
		else
			return false;
	};
};
