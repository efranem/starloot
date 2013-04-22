//  DELETE ME
var nodeArray = new Array;

for (var j = 0; j < 10; j++){
    for (var i = 0; i < 14; i++){
        var node = new XMLNode('scout' + i + '-' + j, (i * 128) + 64, (j * 128) + 16, "reconnInfo");
        node.play();
        nodeArray.push( node );
    };
}

var timer = new Timer( 3000, function(){ console.log('Timer done'); } )
/////////////


function GameLogic(){
    this.logicTime = 0;

    this.logicTick = function(elapsedTime){
        // Start timing
        var time1 = new Date().getTime();

        //  DELETE ME
        for (var i = 0; i < nodeArray.length; i++){
            var temp = nodeArray[i];
            temp.update( elapsedTime );
        };

        timer.update( elapsedTime );
        //console.log(timer.percentageCovered(), "%");
        /////////////

        // Event tick every logictick
        Game.eventManager.update( elapsedTime );

        this.logicTime = new Date().getTime() - time1;
    };
    
};