function showTap ( id ) {
    document.getElementById(id).style.display = "block";
}


function submitSuccessful( innerText ) {
    document.getElementById( "submitModal").style.display = "block";
}

function closeModal() {
    document.getElementById( "submitModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById( "submitModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}