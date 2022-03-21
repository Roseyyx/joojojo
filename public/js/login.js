localStorage.setItem("account", "login")

document.getElementById("form").innerHTML = `
<div class="slide" id="slide">
<div class="slideBlock" id="slideBlock">Log In</div>
<p class="blockTekst">Sign Up</p>
</div>
`


function wissel(){
console.log("lgtm")
    switch(localStorage.getItem("account")){
        case "login":
            localStorage.setItem("account", "signup")
            load()
            break;
        case "signup":
            localStorage.setItem("account", "login")
            load()
        break;
    }
}

function load(){
    try{
    document.getElementById("login").innerHTML = ""
    }catch(err){

    }

switch(localStorage.getItem("account")){
    case "login":
        document.getElementById("form").innerHTML += `
        <form class="login">
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        <input class="remember" id="remember" type="checkbox"><label class="remember" id="remember">Onthoud mij</label>
        </form>
        `
        document.getElementById("slideBlock").style.animation = "login 1s"
        // document.getElementById("slideBlock").style.animationDuration = "1s"
        // document.getElementById("slideBlock").style.float = "left"
        break;
    case "signup":
        document.getElementById("form").innerHTML += `
        <form class="login">
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>E-mail</label>
        <input type="email" placeholder="E-mail">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        </form>
        `
        document.getElementById("slideBlock").style.float = "right"
        break;
    default:
        document.getElementById("form").innerHTML += `
        <form class="login">
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        </form>
        `
        document.getElementById("slideBlock").style.animation = "signup 1s"
        // document.getElementById("slideBlock").style.float = "left"
    }   
    document.getElementById("slide").addEventListener("click", wissel)
}
load()

