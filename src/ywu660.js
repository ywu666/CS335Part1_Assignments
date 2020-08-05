
function showTap ( id ) {
    hideTaps();
    if(id == "productsTap") {
        getProducts();
    }
    document.getElementById( id ).style.display = "block";
}

function hideTaps() {
    const list = document.getElementsByClassName("tap");
    for(var i=0;i<list.length;i++) {
        list[i].style.display = "none";
    }
}

function submitComment( comment ) {
    fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(comment)
    }).then( r => r.json() )
        .then( result => console.log(result.message) );
 }

function submitSuccessful() {
    document.getElementById("submitModal").style.display = "block";
}

function closeModal() {
    document.getElementById("submitModal").style.display = "none";
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
    let counter = 0;

    for (let i = 0; i < products.length; i++) {
            const record = products[i];

            tableContent += "<td>" +
                "<img src='http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId + "'/>" +
                "<figcaption>" + record.Title + "</figcaption>" +
                "<figcaption>"+ record.Origin + " " + record.Price + " " + record.Type +"</figcaption>" +
                "<button class='buyBtn' value='" + record.ItemID + "'>Buy Now</button>" +
                "</td>";

            counter += 1;

            if (counter > 3) {
                tableContent += "</tr>\n";
                counter = 0;
            }
        }
        document.getElementById("showProducts").innerHTML = tableContent;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function( event) {
    const modal = document.getElementById("submitModal");

    if ( event.target == modal ) {
        modal.style.display = "none";
    }
}