document.body.onload = function(){
	init();	
}

function init(){
	// scrollbars deletion
	document.documentElement.style.overflow='hidden';
	document.body.scroll="no";

	// init event handlers
	eventManager.init();

	// DELETE ME
	var test = function() { console.log('Captured KB!');};
	eventManager.addListener( 'mouse', 'onmousedown', function() { console.log('Captured down!');} );
	eventManager.addListener( 'keyboard', 'keypressed', test);
	eventManager.addListener( 'custom', ' ', function() { console.log('Own soft. event!');} );

	eventManager.removeListener( 'keyboard', 'keypressed', test );
	eventManager.removeListener( 'mouse', 'onmousedown', function() { console.log('Captured down!');} );
	////////////

	// loop game
	window.onEachFrame(Game.loop);
};