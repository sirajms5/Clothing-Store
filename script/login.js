let loginButton = document.getElementById("button-log-in");
let emailInput = document.getElementById("log-in-email");
let passwordInput = document.getElementById("log-in-password");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

// alert to tell customer that we are having issues
function errorAlert(){
    alert("OOPS! Something went wrong. Please try again later.");
}

// email input limit control
emailInput.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);

    if (emailInput.value.length > 69) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// password input limit control
passwordInput.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (passwordInput.value.length > 29) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// logging in
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let emailValue = emailInput.value.trim();
    let emailRegEx = /^[^@.\s]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    let passwordValue = passwordInput.value;
    if (emailRegEx.test(emailValue) && passwordValue != "") {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", "./php/login.php", true);

        xmlHttpRequest.onload = () => {
            if (xmlHttpRequest.status === 200) {
                let result = JSON.parse(xmlHttpRequest.responseText);
                if (result["wrong"] == "unregistered email") {
                    emailError.innerText = "Email is not registered."
                    emailError.style.display = "inline";
                } else if (result["wrong"] == "wrong password") {
                    emailError.style.display = "none";
                    passwordError.innerText = "Wrong Password.";
                    passwordError.style.display = "inline";
                } else if (result.hasOwnProperty("error")) {
                    console.error(result["error"]);
                    errorAlert()
                } else {
                    let firstName = result["First_Name"];
                    let lastName = result["Last_Name"];
                    let id = result["id"];
                    sessionStorage.setItem("first-name", firstName);
                    sessionStorage.setItem("last-name", lastName);
                    sessionStorage.setItem("id", id);
                    window.location.href = "./index.html";
                }
            } else {
                console.error("Can't connect to login.php");
                errorAlert()
            }
        }
        xmlHttpRequest.send(new FormData(document.getElementById("log-in-form")));
    } else {
        if(emailValue == ""){
            emailError.style.display = "inline";
            emailError.innerText = "Email field can't be empty.";
        } else if (!emailRegEx.test(emailValue)) {
            emailError.style.display = "inline";
            emailError.innerText = "Email field should be in xyz@xyz.xyz format";
        } else {
            emailError.style.display = "none";
        }

        if (passwordValue == "") {
            passwordError.style.display = "inline";
            passwordError.innerText = "Password field can't be empty."
        } else {
            passwordError.style.display = "none";
        }
    }

});
