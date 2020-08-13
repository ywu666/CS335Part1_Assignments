function getMetrics() {
    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            showMetrics( data );
            generateGraph( data );
        } );
}

function generateGraph( data ) {
    //Set up the variables
    let positions = [];
    const numOfVertices = data.length;
    let circles = makePolygon( 250, 125, numOfVertices, 100 );
    let innerCircles = makePolygon( 250, 125, numOfVertices, 80 );
    for( let i = 0; i < numOfVertices; i++ ) {
        //Create an inner cycle for lines to connected vertexes
        positions.push( innerCircles[ i ].x + "," + innerCircles[ i ].y );
    }

    //Draw the n-side polygon with text circles
    let content = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 250'>";
    for( let i = 0; i < circles.length; i++ ) {
        //Center the text in the circle
        content += "<circle cx='"+ circles[ i ].x +"' cy='"+ circles[ i ].y +"' fill='none' stroke='black' stroke-width='1px' r='20'/>" +
            "<text x='"+ circles[ i ].x +"' y='"+ circles[ i ].y +"' text-anchor='middle' dy='0.3em'>"+ i +"</text>";
    }

    //Connected the vertices based on the metrics
    for( let i = 0; i < numOfVertices; i++ ) {
        for( let j = i; j < numOfVertices; j++ ) {
            if ( data[ i ][ j ] == 1 ) {
                content += "<path d='M"+ positions[ i ] +" L"+ positions[ j ] +"'" +
                    "style='stroke:black; stroke-width:1px; fill:none;'/>";
            }
        }

    }
    content += "</svg>";
    document.getElementById( "graph" ).innerHTML = content;
}

/**
 * Generate n-side regular polygon
 * @param posX the x of reference center
 * @param posY the y of reference center
 * @param numSides
 * @param size the radius of a cycle
 * @returns {[]} the x and y positions of the points
 */
function makePolygon( posX, posY, numSides, size ) {
    let points = [], point = {};
    for ( let i = 0; i < numSides; i++ ) {
        point = {
            x: posX + size * Math.sin( 2 * Math.PI * i / numSides ),
            y: posY + size * Math.cos( 2 * Math.PI * i / numSides ),
        }
        points.push( point );
    }
    return points;
}

function showMetrics( data ) {
    let dataParam = JSON.stringify( data );
    document.getElementById( "metrics" ).innerHTML= "<p>"+ dataParam + "</p>"
}

//Call the functions
getMetrics();
