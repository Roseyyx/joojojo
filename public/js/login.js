localStorage.setItem("account", "login")

document.getElementById("form").innerHTML = `
<div class="slide" id="slide">
<div class="slideBlock" id="slideBlock">Log In</div>
<div class="slideBlock2" id="slideBlock2">signUp</div>
</div>
`

document.getElementById("form").innerHTML += `
        <form id="login" class="login">
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        </form>
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
    console.log(localStorage.getItem("account"))
    }catch(err){

    }

switch(localStorage.getItem("account")){
    case "login":
        console.log("login")
        document.getElementById("login").innerHTML += `
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        <input class="remember" id="remember" type="checkbox"><label class="remember" id="remember">Onthoud mij</label>
        `
        document.getElementById("slideBlock").style.animation = "right 1s"
        document.getElementById("slideBlock").style.marginLeft = "-5%"
        document.getElementById("slideBlock").style.backgroundColor = "var(--buttonActive)"
        document.getElementById("slideBlock2").style.animation = "left 1s"
        document.getElementById("slideBlock2").style.marginLeft = "0%"
        document.getElementById("slideBlock2").style.backgroundColor = "var(--buttonNope)"

        break;
    case "signup":
        console.log("signup")
        document.getElementById("login").innerHTML += `
        <label>Naam</label>
        <input type="text" placeholder="Naam">
        <label>E-mail</label>
        <input type="email" placeholder="E-mail">
        <label>Wachtwoord</label>
        <input type="password" placeholder="Wachtwoord">
        `
        document.getElementById("slideBlock2").style.animation = "right 1s"
        document.getElementById("slideBlock2").style.marginLeft = "-5%"
        document.getElementById("slideBlock2").style.backgroundColor = "var(--buttonActive)"
        document.getElementById("slideBlock").style.animation = "left 1s"
        document.getElementById("slideBlock").style.marginLeft = "0%"
        document.getElementById("slideBlock").style.backgroundColor = "var(--buttonNope)"
        break;
}
    document.getElementById("slide").addEventListener("click", wissel)
}
document.getElementById("slide").addEventListener("click", wissel)

