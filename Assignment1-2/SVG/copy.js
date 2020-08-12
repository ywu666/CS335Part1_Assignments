var length;
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
                generateCircles();
        } );
}


function generateCircles() {
    //Set up the variables
    var circles = [], position = {} ,x, y, overlapping = false, counter = 0;

    //Create circles
    while( circles.length < numOfVertices && counter <1000 ) {
        position = {
            x: Math.floor(Math.random() * 400) + 50,
            y: Math.floor(Math.random() * 250) + 50,
            r: 20
        };
        overlapping = false;

        //check if there is any overlapping
        for ( let i = 0; i < circles.length; i++ ) {
            let existing = circles[i];
            let d = dist(position.x, position.y, existing.x, existing.y);
            if ( d < position.r + existing.r ) {
                // They are overlapping
                overlapping = true;
                // do not add to array
                break;
            }
        }
        // add valid circles to array
        if ( !overlapping ) {
            circles.push( position );
            positions.push( position.x + "," + position.y );
        }
        counter++;
    }

    console.log(circles.length);

    var content = "";
    for(let i=0; i < circles.length; i++ ) {
        content += "<circle cx='"+ circles[i].x +"' cy='"+ circles[i].y +"' fill='none' stroke='black' stroke-width='1px' r='20'/>" +
            "<text text-anchor='middle'  dy='0.3em'>"+ i +"</text>";
    }

    return content;
}

function dist (x1, x2, y1, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt( a*a + b*b );
}