let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");

if(firstName != null && lastName != null){    
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("sign-out").style.display = "inline";
    let username = document.getElementById("logged-in-name");
    username.innerText = firstName + " " + lastName;
}