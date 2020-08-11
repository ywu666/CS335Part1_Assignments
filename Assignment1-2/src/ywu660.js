function getData() {
    fetch ("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data =>
            console.log( data )
        );
}

function createGraph( data ) {
    let content = "";
    const numOfVertices = data.length;
    
    for(let i=0; i < numOfVertices; i++ ) {
        var arr = data[i];
       　for(var j=i;j<data[i].length;j++) {
           if (data[i][j] == 1) {

           }
        }

    }


}