document.body.onload = function(){
	init();	
}

function init(){
	// scrollbars deletion
	document.documentElement.style.overflow='hidden';
	document.body.scroll="no";

	// init event handlers
	Game.eventManager.init();

	// DELETE ME
	var test = function() { console.log('Captured KB!');};
	Game.eventManager.addListener( 'mouse', 'onmousedown', function() { console.log('Captured down!');} );
	Game.eventManager.addListener( 'keyboard', 'keypressed', test);
	Game.eventManager.addListener( 'custom', ' ', function() { console.log('Own soft. event!');} );

	//Game.eventManager.removeListener( 'keyboard', 'keypressed', test );
	//Game.eventManager.removeListener( 'mouse', 'onmousedown', function() { console.log('Captured down!');} );
	////////////

	// loop game
	window.onEachFrame(Game.loop);
};