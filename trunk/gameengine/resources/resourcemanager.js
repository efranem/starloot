/**
 * @author alkaitz
*/
ResourceManager = (function(){
    function ResourceManager(){
        var elements = {};

        /**
         * Looks for an image in the table
         */
        this.getImage = function( id ){
            if ( id ){
                if (elements[ id ]) {
                    return elements[ id ];
                }
                else {
                    elements[ id ] = new Image();
                    elements[ id ].src = ImagesList[ id ];
                    elements[ id ].loaded = false;
                    elements[ id ].onload = function() {
                        elements[ id ].loaded = true;
                    };
                    return elements[ id ];
                };        
            };
        };
    }
    var instance;
  

    return {
        getInstance : function (){
            if (instance == null){
                instance = new ResourceManager();
                // This way the constructor can not be called
                instance.constructor = null;
            }
            return instance;
        }
    };
})();