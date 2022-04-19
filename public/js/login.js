localStorage.setItem("account", "login")

// bagger code voor het achterhalen van de vw
window.addEventListener("resize", size)
let vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
function size(){
    vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    window.addEventListener("resize", load)
}

// Zet de slider voor login/signup op de pagina
document.getElementById("form").innerHTML = `
<div class="slide" id="slide">
<div class="slideBlock" id="slideBlock">Log In</div>
<div class="slideBlock2" id="slideBlock2">signUp</div>
</div>
`

// Zet standaard de form voor login op de pagina
document.getElementById("form").innerHTML += `
        <form id="login" class="login" action="/auth/login" method="post">
        <label>Naam</label>
        <input type="text" name="username" placeholder="Naam">
        <label>Wachtwoord</label>
        <input name="password" type="password" placeholder="Wachtwoord">
        <input class="remember" id="remember" type="checkbox" name="remember" checked><label class="remember" id="remember" >Onthoud mij</label>
        <button type="submit" id="submitknop">Log In</button>
        </form>
        `

// functie voor het wisselen van login/signup
function wissel(){
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

// funtie voor de juiste form op de pagina zetten
function load(){
    try{
        // maakt de from leeg
    document.getElementById("login").innerHTML = ""
    }catch(err){

    }
// zet de nieuwe form op de pagina
switch(localStorage.getItem("account")){
    case "login":
        // de form
        document.getElementById("login").innerHTML += `
        <label>Naam</label>
        <input type="text" name="username" placeholder="Naam">
        <label>Wachtwoord</label>
        <input name="password" placeholder="Wachtwoord">
        <input class="remember" id="remember" type="checkbox" name="remember" checked><label class="remember" id="remember" >Onthoud mij</label>
        <button type="submit" id="submitknop">Log In</button>
        `
        document.getElementById("login").action = '/auth/login'
        // clusterfuck voor de status van de slider
        document.getElementById("slideBlock").style.animation = "right 1s"
        document.getElementById("slideBlock").style.backgroundColor = "var(--red)"
        document.getElementById("slideBlock2").style.backgroundColor = "var(--buttonNope)"
        document.getElementById("slideBlock2").style.animation = "left 1s"
        if(vw > 810){
            document.getElementById("slideBlock").style.marginLeft = "-5%"
            document.getElementById("slideBlock2").style.marginLeft = "0%"
        } else{
            document.getElementById("slideBlock").style.marginLeft = "-10%"
            document.getElementById("slideBlock2").style.marginLeft = "0%"
        }
        break;
    case "signup":
        // de form
        document.getElementById("login").innerHTML += `
        <label>Naam</label>
        <input type="text" name="username" placeholder="Naam">
        <label>E-mail</label>
        <input name="email" placeholder="E-mail">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        <button type="submit" id="submitknop">Account aanmaken</button>
        `
        // Verander de form action
        document.getElementById("login").action = '/auth/register'

        // clusterfuck voor de status van de slider
        document.getElementById("slideBlock2").style.animation = "right 1s"
        document.getElementById("slideBlock2").style.backgroundColor = "var(--red)"
        document.getElementById("slideBlock").style.animation = "left 1s"
        document.getElementById("slideBlock").style.backgroundColor = "var(--buttonNope)"
        if(vw > 810){
            document.getElementById("slideBlock2").style.marginLeft = "-5%"
            document.getElementById("slideBlock").style.marginLeft = "0%"
        } else{
            document.getElementById("slideBlock2").style.marginLeft = "-10%"
            document.getElementById("slideBlock").style.marginLeft = "0%"
        }
        break;
    }
}
// listener event voor de slider
document.getElementById("slide").addEventListener("click", wissel)

