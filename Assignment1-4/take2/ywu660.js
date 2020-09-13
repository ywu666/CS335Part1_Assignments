function showTap ( id ) {
    hideTaps();

    if ( id === "productsTap" ) {
        getProducts();
    }

    if ( id === "newsTap" ) {
        getNews();
    }

    if( id === "locationTap") {
        getLocations();
    }

    document.getElementById( id ).style.display = "block";
}

function hideTaps() {
    const list = document.getElementsByClassName( "tap" );
    for( let i = 0; i < list.length; i++ ) {
        list[ i ].style.display = "none";
    }
}

function getProducts() {
    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items", {
        headers: {
            'Accept': 'application/json'
        },
    } )
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
            + "<button onclick='buyNow(this)' class='buyBtn' value='" + record.ItemId + "'>Buy Now</button>"
            + "</td>";
        count += 1;

        if ( count > 2 ) {
            tableContent += "</tr>\n";
            count = 0;
        }
    }

    document.getElementById( "showProducts" ).innerHTML = tableContent;
}

function getNews () {
    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
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

    document.getElementById( "showNews" ).innerHTML = newsContent;
}

function submitComment() {
    const name = document.getElementById( "fname" ).value;
    const comment = document.getElementById( "message" ).value;

    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( comment )
    } )
        .then( response => {
            response.onload = showComment();
            response.status;
        } )
        . then( data => {
            console.log( data )
        } );
}

function showComment() {
    //clear the form
    document.getElementById( "fname" ).value = "";
    document.getElementById( "message" ).value = "";

    //Renew the comment after submit
    document.getElementById( "recentEntries" ).src = document.getElementById( "recentEntries" ).src;
}

function search( data ) {
    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" + data, {
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

function getLocations () {
    fetch ( "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard" )
        .then( response =>
            response.text()
        )
        .then( data => {
            showLocations( data );
        } );
}

function showLocations( data ) {
    //assign the email address
    let content = "", phone = "", address = "";
    let email = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');

    const strs = data.split('\n');

    //exact the phone number and address
    for( let i = 0; i < strs.length; i++ ) {
        if( strs[ i ].match( "VOICE" ) ) {
            phone = strs[ i ].split(":")[ 1 ];
        }

        if( strs[i].match("DR;WORK;PREF:;;" ) ) {
            address = strs[ i ].split(";;")[ 1 ];
        }
    }

    //display the information of locations
    content = "<p>Address:"+ address + " </p>"
            + "Email:" + "<a id='email' href='mailto:" + email + "'>"+ email +"</a>\n"
            + "Tel:" + "<a id='phone' href='tel:" + phone + "'>"+ phone +"‬</a>"
            + "<a href='http://redsox.uoa.auckland.ac.nz/ds/mecard.svg' target='_blank'><br>\n"
            + "Add us to your address book.\n"
            + "</a>";

    document.getElementById( "footer" ).innerHTML = content;
}

function login() {
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const xhr = new XMLHttpRequest();
    const uri = "http://localhost:8189/Service.svc/id";
    xhr.open("GET", uri, true, user, password);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        console.log(xhr.status);
        if(xhr.status === 200) { //the user and password is valid
            //show the products
            document.getElementById( "loginTap" ).style.display = "none";
            document.getElementById( "loginSuccess" ).style.display = "block";

        } else {
            alert("The account is invalid. Please sign up first.")
        }
    }
    xhr.send(null);
}

function singUp() {
    var username = document.getElementById("registerUsername").value;
    var address = document.getElementById("registerAddress").value;
    var password = document.getElementById("registerPassword").value;

    var uri = "http://localhost:8188/DairyService.svc/register";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send( JSON.stringify({
            Address : address,
            Name : username,
            Password : password
        } )
    );

    xhr.onload = function() {
        document.getElementById("registerUsername").value = "";
        document.getElementById("registerAddress").value = "";
        document.getElementById("registerPassword").value = "";

        if (xhr.responseText.includes("registered")) {
            document.getElementById("successMsg").classList.add("success");
        } else {
            document.getElementById("successMsg").classList.add("failure");
        }
        document.getElementById("successMsg").innerHTML = xhr.responseText;
    }
}

function buyNow( item ) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/dsa/Service.svc/buy?id=" + item.value, true);
    xhr.setRequestHeader("accept", "application/json");

    xhr.onload = function() {
        document.getElementById("buyMessage").innerText = xhr.responseText;
        console.log(xhr.responseText);

    }
    xhr.send(null);
    showModal();
}

function showModal() {
    // get the relationship graph of the file that user wants to share
    const modal = document.getElementById( "modal" );
    if( modal.style.display === "none" ) {
        // if the model is already displayed, hide the graph
        modal.style.display = "block";

    } else {
        // if the model is hidden, show it
        modal.style.display = "none";
    }
}

function closeModal() {
    const modal = document.getElementById( "modal" );
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById( "modal" );
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



