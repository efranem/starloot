/**
 * @author alkaitz
*/
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
};

resourceManager = new ResourceManager();