let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let id = sessionStorage.getItem("id");
let username = document.getElementById("logged-in-name");

if(firstName != null && lastName != null){    
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("sign-out").style.display = "inline";    
    username.innerText = firstName + " " + lastName;
}

let signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", () => {
    sessionStorage.clear();
    firstName = null;
    lastName = null;
    id = null;
    username.innerText = "";
})