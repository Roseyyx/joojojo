let close = document.getElementsByClassName("closebtn");

for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        let div = this.parentElement;
        div.style.opacity = 0;
        setTimeout(function(){div.style.display = "none";}, 600);
    }
}

let alerts = document.getElementsByClassName("alert");
let myTimeout = setTimeout(fade, 2000);

function fade(){
    for (let i = 0; i < alerts.length; i++) {
        alerts[i].style.opacity = 0;
    }
}