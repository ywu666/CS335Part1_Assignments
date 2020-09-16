function getData() {
    fetch ( "https://api.thevirustracker.com/free-api?countryTimeline=NZ", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            var newestDay = getTodayData( data );
            setCaseStatistics( newestDay );
            drawPieChart( newestDay );
            drawLineChart( data.timelineitems[0], newestDay )
        } );
}

/**
 * This function get the JSON Object of the today
 * @param data
 * @returns {*}
 */
function getTodayData( data ) {
    let timeLineItems = data.timelineitems;
    let today = getToday() + "";
    let newestDay = timeLineItems[0][today];
    return newestDay;
}

/**
 * Display the COVID-19 data of today.
 * @param data
 */
function setCaseStatistics( newestDay ) {
    let newCases = "+" + newestDay.new_daily_cases;

    //Set the newest data
    document.getElementById("numOfInfections").innerText = numberWithCommas( newestDay.total_cases );
    document.getElementById("newCasesTodayTotal").innerText = numberWithCommas( newCases );
    document.getElementById("newDeathsTodayTotal").innerText = numberWithCommas( newestDay.new_daily_deaths );
    document.getElementById("recoveredNum").innerText = numberWithCommas( newestDay.total_recoveries );
    document.getElementById("deathsNum").innerText = numberWithCommas( newestDay.total_deaths );

    //Calculate the unresolved cases
    let unresolved = newestDay.total_cases - newestDay.total_recoveries - newestDay.total_deaths;
    document.getElementById("unresolvedNum").innerText = unresolved;
}

/**
 * This function get the current date which format is matching the JSON object in the fetch.
 * @returns {string}
 */
function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0') - 1;
    var mm = String(today.getMonth() + 1).padStart(2, '0').substring(1, 2); //January is 0!
    var yyyy = today.getFullYear() + "";
    yyyy = yyyy.substring(2, 4);

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function getMonth() {
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0').substring(1, 2); //January is 0!
    return mm;
}

/**
 * This function add the commas as the thousands seperators for greate number
 * @param x
 * @returns {string}
 */
function numberWithCommas( x ) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Call the functions
getData();

/**
 * This function draw the pie chart based on the daily data.
 * @param newestDay
 */
function drawPieChart( newestDay ) {
    let unresolved = newestDay.total_cases - newestDay.total_recoveries - newestDay.total_deaths;
    var data = [
        {
            "name": "Death",
            "color": "red",
            "value": newestDay.total_deaths
        }, {
            "name": "Infected",
            "color": "dodgerblue",
            "value": newestDay.total_cases
        }, {
            "name": "Recovered",
            "color": "limegreen",
            "value": newestDay.total_recoveries
        }, {
            "name": "Serious Cases",
            "color": "dimgrey",
            "value": unresolved
        }
    ];

    // Setup global variables
    var svg = document.getElementById('pie-chart'),
        list = document.getElementById('pie-values'),
        totalValue = 0,
        radius = 100,
        circleLength = Math.PI * (radius * 2), // Circumference = PI * Diameter
        spaceLeft = circleLength;

    // Get total value of all data.
    for (var i = 0; i < data.length; i++) {
        totalValue += data[i].value;
    }

    // Loop trough data to create pie
    for (let c = 0; c < data.length; c++) {

        // Create circle
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // Set attributes (self explanatory)
        circle.setAttribute("class", "pie-chart-value");
        circle.setAttribute("cx", "150");
        circle.setAttribute("cy", "150");
        circle.setAttribute("r", radius);

        // Set dash on circle
        circle.style.strokeDasharray = (spaceLeft) + " " + circleLength;

        // Set Stroke color
        circle.style.stroke = data[c].color;

        // Append circle to svg.
        svg.appendChild(circle);

        // Subtract current value from spaceLeft
        spaceLeft -= (data[c].value / totalValue) * circleLength;

        // Add value to list.
        var listItem = document.createElement('li'),
            valuePct = parseFloat((data[c].value / totalValue) * 100).toFixed(1);

        // Add text to list item
        listItem.innerHTML = data[c].name + ' (' + valuePct + '%)';

        // Set color of value to create relation to pie.
        listItem.style.color = data[c].color;

        // Append to list.
        list.appendChild(listItem);
    }
}

var points = document.getElementById("data"), posXs = [], posYs = [], posDeathY =[];
function drawLineChart( data, newestDay ) {
    var mmEnd = parseInt(getMonth()),
        xLabels = document.getElementById("x-labels"),
        yLabels = document.getElementById("y-labels"),
        mmStart = mmEnd - 4;

    //Draw the y gid labels
    var y = 373;
    for(let i = 0;i < 5; i++) {
        posYs.push(y);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "80");
        text.setAttribute("y", y);
        text.innerHTML = "" + (i * 500);
        yLabels.appendChild(text);
        y = y - 86;
    }

    //Draw the start point
    drawStartPoint(370, "total");

    //Draw the x grid labels
    var x = 150;
    for(let i = mmStart; i <= mmEnd;i++) {
        posXs.push(x);

        //Create text
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", 400);
        text.innerHTML = "1/" + i + "";
        xLabels.appendChild(text);

        //Draw the points
        var date =  i + "/01/20";
        drawPoints(data[date].total_cases, x, "total");
        drawPoints(data[date].total_recoveries, x, "recover");
        x = x + 146;
    }

    connectPoints("dodgerblue", "total");
    connectPoints("limegreen", "recover");
}

function convertNumToPos( num, className) {
    let posY = 370;
    if(num == 0) {
        return 370;
    }
    let remainder = num % 500;
    let tenth = (num - remainder) / 500;
    posY = posYs[tenth] - (remainder / (500 / 86));
    return posY;
}

function drawStartPoint( posY, className) {
    posXs.push(90);
    posTotalY.push(posY);
    posRecoverY.push(posY);

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", className);
    circle.setAttribute("cx", "90");
    circle.setAttribute("cy", posY);
    circle.setAttribute("r", "4");
    points.appendChild(circle);
}

var posTotalY = [], posRecoverY = [];
function drawPoints(num, x, className) {
    //Draw points
    var posY = convertNumToPos( num );

    if(className == "total") {
        posTotalY.push(posY);
    } else {
        posRecoverY.push(posY);
    }

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", className);
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", posY);
    circle.setAttribute("r", "4");
    points.appendChild( circle );
}

function connectPoints( colour, className) {
    var polyLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyLine.setAttribute("id", "totalLine")
    polyLine.setAttribute("fill", "none");
    polyLine.setAttribute("stroke", colour);
    polyLine.setAttribute("stroke-width", "3");

    var pointsLine = "";
    if(className == "total") {
        for(let i=0;i <posXs.length;i++) {
            pointsLine = pointsLine + posXs[i] + "," + posTotalY[i] + " ";
        }
    } else {
        for(let i=0;i <posXs.length;i++) {
            pointsLine = pointsLine + posXs[i] + "," + posRecoverY[i] + " ";
        }
    }

    polyLine.setAttribute("points", pointsLine)
    points.appendChild(polyLine);
}


