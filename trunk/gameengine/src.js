document.body.onload = function(){
	init();	
}


function init(){
	// scrollbars deletion
	document.documentElement.style.overflow='hidden';
	document.body.scroll="no";

	// loop game
	window.onEachFrame(Game.loop);
};