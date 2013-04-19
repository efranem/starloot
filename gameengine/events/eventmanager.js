function EventManager(){
	var _keyboard = new Keyboard();
	var _mouse = new Mouse();
	var _touch = new Touch();

	var _eventsTable = {};
	
	this.init = function(){
		_eventsTable['keyboard'] = {};
		_eventsTable['mouse'] = {};
		_eventsTable['touch'] = {};
		_eventsTable['timers'] = {};
		_eventsTable['custom'] = {};
		keyboard.init();
		mouse.init();
		touch.init();
	};

	this.update = function( elapsedTime ){
		// TODO Recall timers availability and custom events (software ones )
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
			if (m_evt.indexOf(callback) !== -1) {
 				m_evt.splice(m_evt.indexOf(callback), 1);
 				return true;
			}
			return false;
		}
		else
			return false;
	};
};

eventManager = new EventManager;
