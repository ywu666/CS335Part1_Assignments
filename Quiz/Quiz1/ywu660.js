var tableContent = "";
var count = 0;
var courseContent = "";
var countForCourse = 0;
var timeTable = ["<b>Monday:</b><br>", "<b>Tuesday:</b><br>", "<b>Wednesday:</b><br>", "<b>Thursday:</b><br>", "<b>Friday:</b><br>"];

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
    //Replace the undefined with better word
    let require, intro;
    if (course.rqrmntDescr != undefined) {
        require = course.rqrmntDescr;
    } else {
        require = "No requirements description for this course."
    }

    if(intro != undefined) {
        intro = course.description;
    } else {
        intro = "Sorry, no introduction for this course currently.";
    }

    //Construct the course table
    courseContent += "<td onclick='getTimeTable("+ course.catalogNbr +")'>"
                 + "<h2>" + course.titleLong + "</h2>"
                 + "<h3>Name: "+ course.acadOrg + course.catalogNbr +"&nbsp;&nbsp;Id: "+ course.crseId +"</h3>"
                 + "<p><b>Credit: </b>" + course.unitsAcadProg + " <b>Main Program: </b>" + course.mainProgram +"</p>"
                 + "<p><b>Introduction:&nbsp;</b>"+ intro +"</p>"
                 + "<p>"+ require +"</p>"
                 + "</td>"
                 + "</tr>\n";

    //Set the course table in the tap
    document.getElementById("showCourses").innerHTML = courseContent;
}

function getTimeTable( catalogNbr ) {
    fetch ( "https://api.test.auckland.ac.nz/service/classes/v1/classes?year=2020&subject=MATHS&size=500&catalogNbr=" + catalogNbr , {
        headers: {
            'Accept': 'application/json'
        },
    } )
        .then( response =>
            response.json()
        )
        .then( data => {
            console.log(data);
            data.data.forEach(time => showTimeTable( time ));
            showModal();
        } );
}

function showTimeTable( time ) {
    var meetings = time.meetingPatterns;
    if( meetings.length > 0) { // Initialise the time table.
        var day = meetings[0].daysOfWeek;
        if( day == "mon" ) {
            timeTable[0] += "Start:" + meetings[0].startTime + " End:" + meetings[0].endTime
                         + " Location:" + meetings[0].location + "<br>";
        } else if( day == "tue" ) {
            timeTable[1] += "Start:" + meetings[0].startTime + " End:" + meetings[0].endTime
                         + " Location:" + meetings[0].location + "<br>";
        } else if ( day == "wed" ) {
            timeTable[2] += "Start:" + meetings[0].startTime + " End:" + meetings[0].endTime
                         + " Location:" + meetings[0].location + "<br>";
        } else if ( day =="thu" ) {
            timeTable[3] += "Start:" + meetings[0].startTime + " End:" + meetings[0].endTime
                         + " Location:" + meetings[0].location + "<br>";
        } else if ( day == "fri"){
            timeTable[4] += "Start:" + meetings[0].startTime + " End:" + meetings[0].endTime
                         + " Location:" + meetings[0].location + "<br>";
        }
    }
    document.getElementById( "title" ).innerText = "Time Table of " + time.acadOrg + time.catalogNbr;
    document.getElementById( "timeTable" ).innerHTML = timeTable.join("<br>");
}

function showModal() {
    console.log("call show model");
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











