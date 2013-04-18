/**
 * @author khanser
*/
XMLReader = (function(){
    function XMLReader(){
        var readFiles = new Array();
        /**
         * Looks for an image in the table
         */
        this.getNodeInfo = function( fileName ){
            var retVal = {};
            if (!(fileName in readFiles)){
                xmlDoc = ResourceManager.getInstance().getXmlResource(fileName);

                node = xmlDoc.firstChild;
                for(var prop in node.childNodes){
                    prop = node.childNodes[prop];
                    if (prop.nodeType == 1){
                        name = prop.localName;
                        var nameValue;
                        
                        switch(name){
                            case 'files':
                                nameValue = new Array();
                                for(var child in prop.childNodes){
                                    child = prop.childNodes[child];
                                    if (child.nodeType == 1){
                                        nameValue.push(child.attributes.getNamedItem('value').nodeValue);
                                    }
                                }
                            break;

                            case 'numFrames':
                            case 'sizeOfSprites': 
                                nameValue = {};
                                for(var i = 0; i < prop.attributes.length;i++){
                                    var attr = prop.attributes[i];
                                    nameValue[attr.localName] =  attr.nodeValue;
                                }
                            break;

                            default: 
                                nameValue = prop.attributes.getNamedItem('value').nodeValue;
                            break;
                        }

                        retVal[name] = nameValue;

                    }
                    
                }
                readFiles[fileName] = retVal;
            }else{

                retVal = readFiles[fileName];
            }

            return retVal;

        };
    }
    var instance;
  

    return {
        getInstance : function (){
            if (instance == null){
                instance = new XMLReader();
                // This way the constructor can not be called
                instance.constructor = null;
            }
            return instance;
        }
    };
})();