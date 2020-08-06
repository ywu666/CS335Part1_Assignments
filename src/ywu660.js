function showTap ( id ) {
    hideTaps();

    if ( id === "productsTap" ) {
        getProducts();
    }

    if ( id === "newsTap" ) {
        getNews();
    }

    document.getElementById( id ).style.display = "block";
}

function hideTaps() {
    const list = document.getElementsByClassName("tap");
    for( let i = 0; i < list.length; i++ ) {
        list[ i ].style.display = "none";
    }
}

function getProducts() {
    fetch (" http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items",{
        headers: {
            'Accept': 'application/json'
        },
    })
        .then( response =>
            response.json()
        )
        .then( data => {
            showProducts( data )
        } );
}

function showProducts( products ) {
    let tableContent = "";
    let count = 0;

    for ( let i = 0; i < products.length; i++ ) {
        const record = products [i ];

        tableContent += "<td>"
            + "<img src='http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId + "'/>"
            + "<h3>" + record.Title + "</h3>"
            + "<figcaption>"+ record.Origin + " Price: $" + record.Price + " " + record.Type +"</figcaption>"
            + "<button class='buyBtn' value='" + record.ItemID + "'>Buy Now</button>"
            + "</td>";
        count += 1;

        if ( count > 2 ) {
            tableContent += "</tr>\n";
            count = 0;
        }
    }

    document.getElementById("showProducts").innerHTML = tableContent;
}

function getNews () {
    fetch (" http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news",{
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            console.log(data);
            showNews( data )
        } );
}

function showNews( news ) {
    let newsContent = "";

    for( let i = 0; i < news.length; i++ ) {
        const record = news[ i ];
        newsContent += "<td>"
            + "<img src=' " + record.enclosureField.urlField + " '/>"
            + "<h2> <a href='" + record.linkField + "' target=\"_blank\">" + record.titleField + "</a></h2>"
            + "<h2>"+ record.pubDateField + "</h2>"
            + "<p>"+ record.descriptionField + "</p>"
            + "</td>"
            + "</tr>\n"
    }

    document.getElementById("showNews").innerHTML = newsContent;
}

/*onClick buttons functions*/
function submitComment() {
    const name = document.getElementById("fname").value;
    const comment = document.getElementById("message").value;

    fetch ("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( comment )
    } )
        .then( response =>
        {
            response.onload = showComment();
            response.status
        } )
        .then( data => {
            console.log(data)
        } );
}

function showComment() {
    //clear the form
    document.getElementById("fname").value = "";
    document.getElementById("message").value = "";

    //Renew the comment after submit
    document.getElementById("recentEntries").src = document.getElementById("recentEntries").src;
}

function search( data ) {
    fetch ("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" + data, {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data =>
            showProducts( data )
        );
}

