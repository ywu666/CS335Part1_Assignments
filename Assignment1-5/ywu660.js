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
            setData( data );
        } );
}

function setData( data ) {
    let timeLineItems = data.timelineitems;
    let today = getToday() + "";
    let newestDay = timeLineItems[0][today];
    let newCases = "+" + newestDay.new_daily_cases;

    //Set the newest data
    document.getElementById("numOfInfections").innerText = newestDay.total_cases;
    document.getElementById("newCasesTodayTotal").innerText = newCases;
    document.getElementById("newDeathsTodayTotal").innerText = newestDay.new_daily_deaths;
    document.getElementById("recoveredNum").innerText = newestDay.total_recoveries;
    document.getElementById("deathsNum").innerText = newestDay.total_deaths;

    //Calculate the unresolved cases
    var unresolved = newestDay.total_cases - newestDay.total_recoveries - newestDay.total_deaths;
    document.getElementById("unresolvedNum").innerText = unresolved;
}
function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0') - 1;
    var mm = String(today.getMonth() + 1).padStart(2, '0').substring(1,2); //January is 0!
    var yyyy = today.getFullYear() + "";
    yyyy = yyyy.substring(2, 4);

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

//Call the functions
getData();




