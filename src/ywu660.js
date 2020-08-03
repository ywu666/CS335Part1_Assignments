
function showTap ( id ) {
    hideTaps();
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
    fetch(" http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items")
        .then( res => {
            return res.json()
        } )
        .then( data => {

        } );
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function( event) {
    const modal = document.getElementById("submitModal")
    if ( event.target == modal ) {
        modal.style.display = "none";
    }
}