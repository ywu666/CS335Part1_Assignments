function getData() {
    fetch ("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            console.log( data );
            generateCircles( data );
        } );
}

function generateCircles( data ) {
    //Set up the variables
    const numOfVertices = data.length;
    let positions = [];
    let circles = makePolygon(250,150, numOfVertices, 80 );
    for( let i = 0; i < numOfVertices; i++ ) {
        positions.push( circles[ i ].x + "," + circles[ i ].y );

    }
    console.log( circles );
    console.log( positions );

    //Draw the n-side polygon
    let content = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 300\">";
    for( let i = 0; i < circles.length; i++ ) {
        //Center the text in the circle
        content += "<circle cx='"+ circles[ i ].x +"' cy='"+ circles[ i ].y +"' fill='black' stroke='black' stroke-width='1px' r='20'/>" +
            "<text x='"+ circles[ i ].x +"' y='"+ circles[ i ].y +"' text-anchor='middle' dy='0.3em' fill='white'>"+ i +"</text>";
    }

    //Connected the vertices based on the metrics
    for( let i = 0; i < numOfVertices; i++ ) {
        for( let j = i; j < numOfVertices; j++ ) {
            if ( data[ i ][ j ] == 1 ) {
                content += "<path d='M"+ positions[ i ] +" L"+ positions[j] +"'" +
                    "style='stroke: black; stroke-width: 1px; fill: none;'/>";
            }
        }

    }

    content += "</svg>";
    document.getElementById( "graph" ).innerHTML = content;
}


function makePolygon(posX, posY, numSides, size) {
    var points = [], point={};
    for (var i = 0; i < numSides; i++) {
        point = {
            x: posX + size * Math.sin( 2 * Math.PI * i / numSides ),
            y: posY + size * Math.cos( 2 * Math.PI * i / numSides ),
        }
        points.push( point );
    }
    return points;
}

//Call the functions
getData();