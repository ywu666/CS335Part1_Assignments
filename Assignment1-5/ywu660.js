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
    var mm = String(today.getMonth() + 1).padStart(2, '0').substring(1,2); //January is 0!
    var yyyy = today.getFullYear() + "";
    yyyy = yyyy.substring(2, 4);

    today = mm + '/' + dd + '/' + yyyy;
    return today;
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
            "color": "green",
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
        circle.setAttribute("cx", 150);
        circle.setAttribute("cy", 150);
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


