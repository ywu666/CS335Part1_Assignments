var tableContent = "";
var count = 0;
var courseContent = "";
var countForCourse = 0;
var timeTable = "";

function showTap ( id ) {
    hideTaps();

    if ( id === "staffTap" ) {
        getStaff();
    }

    if ( id === "courseTap" ) {
        getCourse();
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
            //console.log(data);
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

    var imageUrl = "";
    if (staff.imageId != undefined) {
        imageUrl = "https://unidirectory.auckland.ac.nz/people/imageraw/" + staff.profileUrl[ 1 ] + "/" + staff.imageId + "/biggest";
    } else {
        imageUrl = "https://unidirectory.auckland.ac.nz/people/imageraw/no-person/0/biggest";
    }

    //Construct the table with the information of the staff
    tableContent += "<td>"
        + "<img src='" + imageUrl + "' alt='image'/>"
        + "<h3>Name:" + staff.names[ 0 ] + " JobTitle: " + staff.jobtitles[ 0 ] + "</h3>"
        + "Email: <a id='email' href='mailto: "+ staff.emailAddresses +" '>" + staff.emailAddresses + "</a>\n"
        + "Phone: <a id='phone' href='tel:" + phone + "'>" + phone + "</a>"
        + "<address>Address:"+ address + "</address>"
        + "Vcard: <a id='vcard' href='"+ url+"'>Add to contact</a>"
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

function getCourse() {
    fetch ( "https://api.test.auckland.ac.nz/service/courses/v2/courses?subject=MATHS&year=2020&size=500", {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            data.data.forEach( course => showCourse(course));
        } );
}

function showCourse( course ) {
    console.log(course);

    var require, intro;
    if(course.rqrmntDescr != undefined) {
        require = course.rqrmntDescr;
    } else {
        require = "No requirements description for this course."
    }

    if(intro != undefined) {
        intro = course.description;
    } else {
        intro = "Sorry, no introduction for this course currently.";
    }

    courseContent += "<td onclick='getTimeTable("+ course.catalogNbr +")'>"
                 + "<h2>" + course.titleLong + "</h2>"
                 + "<h3>Name: "+ course.acadOrg + course.catalogNbr +"&nbsp;&nbsp;Id: "+ course.crseId +"</h3>"
                 + "<p><b>Credit: </b>" + course.unitsAcadProg + " <b>Main Program: </b>" + course.mainProgram +"</p>"
                 + "<p><b>Introduction:&nbsp;</b>"+ intro +"</p>"
                 + "<p>"+ require +"</p>"
                 + "</td>"
                 + "</tr>\n";

    //Set the table in the tap
    document.getElementById("showCourses").innerHTML = courseContent;
}

function getTimeTable( catalogNbr ) {
    console.log( catalogNbr )
    fetch ( "https://api.test.auckland.ac.nz/service/classes/v1/classes?year=2020&subject=MATHS&size=500&catalogNbr=" + catalogNbr , {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            //data.data.forEach(time => showTimeTable( time ));
        } );
}

// function showTimeTable( time ) {
//
//     if(time.meetingPatterns.length > 0) {
//         timeTable += time.meetingPatterns;
//     }
//
//
// }









