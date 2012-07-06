function sleep(milliseconds) {
	var start = new Date().getTime();
	while ((new Date().getTime() - start) < milliseconds){}
};

function indexPair(pair, list) {
    for (var idx in list){
        if (list[ idx ] [ 0 ] == pair [ 0 ] &&
            list[ idx ] [ 1 ] == pair [ 1 ])
            return idx;
    };
    return -1;
};