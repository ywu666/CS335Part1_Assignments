var tableContent = "";
var count = 0;
function showTap ( id ) {
    hideTaps();

    if ( id === "staffTap" ) {
        getStaff();
    }

    document.getElementById( id ).style.display = "block";
}

function hideTaps() {
    const list = document.getElementsByClassName( "tap" );
    for( let i = 0; i < list.length; i++ ) {
        list[ i ].style.display = "none";
    }
}

function getStaff() {
    //Using the CORS proxies
    fetch ( "https://dividni.com/cors/CorsProxyService.svc/proxy?url=" +
        "https://unidirectory.auckland.ac.nz/rest/search?orgFilter=MATHS", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            data.list.forEach( staff => showStaff( staff ) );
        } );
}

async function showStaff( staff ) {
    //Get the vcard from the remote API
    var url = "https://unidirectory.auckland.ac.nz/people/vcard/" + staff.profileUrl[1];
    let response = await fetch(" https://cws.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url=" + url);
    let data = await response.text();

    //Grab the phone number and address from the vcard.
    let phone = "", address = "";
    const strs = data.split('\n');

    for( let i = 0; i < strs.length; i++ ) {
        if ( strs[ i ].match( "TEL;"  )) {
            phone = strs[ i ].split(":")[ 1 ];
        }

        if ( strs[ i ].match( "ADR;" ) ) {
            address = strs[ i ].split(";;")[ 1 ];
        }
    }

    //Construct the table with the information of the staff
    tableContent += "<td>"
        + "<img src='https://unidirectory.auckland.ac.nz/people/imageraw/" + staff.profileUrl[ 1 ] + "/" + staff.imageId + "/biggest' alt='image'/>"
        + "<h3>" + staff.names[ 0 ] + " JobTitle: " + staff.jobtitles[ 0 ] + "</h3>"
        + "Email: <a id='email' href='mailto: "+ staff.emailAddresses +" '>" + staff.emailAddresses + "</a>\n"
        + "Phone: <a id='phone' href='tel:" + phone + "'>" + phone + "</a>"
        + "<address>Address: "+ address + " </address>"
        + "</td>";

    count += 1;

    //Change the row
    if (count > 1) {
        tableContent += "</tr>\n";
        count = 0;
    }

    //Set the table in the tap
    document.getElementById("showStaff").innerHTML = tableContent;
}


