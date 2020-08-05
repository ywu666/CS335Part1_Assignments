
function showTap ( id ) {
    hideTaps();
    if( id === "productsTap" ) {
        getProducts();
    }

    if( id === "newsTap" ) {
        getNews();
    }

    document.getElementById( id ).style.display = "block";
}

function hideTaps() {
    const list = document.getElementsByClassName("tap");
    for(var i=0; i<list.length; i++) {
        list[i].style.display = "none";
    }
}

function submitComment( comment ) {
    fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/", { method: 'POST' })
        .then( response =>
            response.status
        )
        .then( data =>
            console.log( data )
        );
 }

function getProducts() {
    fetch(" http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items",{
        headers: {
            'Accept': 'application/json',
        },
    })
        .then( response =>
            response.json()
        )
        .then( data => {
            console.log(data);
            showProducts( data )
        } );
}

function showProducts( products ) {
    let tableContent = "";
    let count = 0;

    for (let i = 0; i < products.length; i++) {
            const record = products[i];

            tableContent += "<td>" +
                "<img src='http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId + "'/>" +
                "<h3>" + record.Title + "</h3>" +
                "<figcaption>"+ record.Origin + " Price: $" + record.Price + " " + record.Type +"</figcaption>" +
                "<button class='buyBtn' value='" + record.ItemID + "'>Buy Now</button>" +
                "</td>";
            count += 1;

            if (count > 2) {
                tableContent += "</tr>\n";
                count = 0;
            }
        }
        document.getElementById("showProducts").innerHTML = tableContent;
}

function getNews () {
    fetch(" http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news",{
        headers: {
            'Accept': 'application/json',
        },
    })
        .then( response =>
            response.json()
        )
        .then( data => {
            console.log(data);
            showNews( data )
        } );

}

function showNews( news ) {

}

