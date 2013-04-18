document.body.onload = function(){
	init();	
}


function init(){
	// scrollbars deletion
	document.documentElement.style.overflow='hidden';
	document.body.scroll="no";

	// init event handlers
	eventManager.init();

	// loop game
	window.onEachFrame(Game.loop);
};