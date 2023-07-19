let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");

if(firstName != null && lastName != null){
    let username = document.getElementById("logged-in-name");
    username.innerText = firstName + " " + lastName;
}