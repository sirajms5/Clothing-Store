let loginButton = document.getElementById("button-log-in");
let emailInput = document.getElementById("log-in-email");
let passwordInput = document.getElementById("log-in-password");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

emailInput.addEventListener("keydown", (event) => {
    if(emailInput.value.length > 69){ // length increases after function finishes
        event.preventDefault();
    }
})

passwordInput.addEventListener("keydown", (event) => {
    if(passwordInput.value.length > 29){ // length increases after function finishes
        event.preventDefault();
    }
})

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let emailValue = emailInput.value;
    let passwordValue = passwordInput.value;
    if (emailValue != "" && passwordValue != "") {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", "./php/login.php", true);

        xmlHttpRequest.onload = () => {
            if (xmlHttpRequest.status === 200) {
                if (xmlHttpRequest.responseText == "unregistered email") {
                    emailError.innerText = "Email is not registered."
                    emailError.style.display = "inline";                    
                } else if (xmlHttpRequest.responseText == "wrong password") {
                    emailError.style.display = "none";
                    passwordError.innerText = "Wrong Password.";
                    passwordError.style.display = "inline";
                } else {
                    let result = xmlHttpRequest.responseText.split("-");
                    let firstName = result[0];
                    let lastName = result[1];
                    let id = result[2];
                    sessionStorage.setItem("first-name", firstName);
                    sessionStorage.setItem("last-name", lastName);
                    sessionStorage.setItem("id", id);
                    window.location.href = "./index.html";
                }
            } else {
                alert("failure");
            }
        }
        xmlHttpRequest.send(new FormData(document.getElementById("log-in-form")));
    } else {
        if(emailValue == ""){
            emailError.style.display = "inline";
            emailError.innerText = "Email field can't be empty."
        } else {
            emailError.style.display = "none";
        }

        if(passwordValue == ""){
            passwordError.style.display = "inline";
            passwordError.innerText = "Password field can't be empty."
        } else {
            passwordError.style.display = "none";
        }
    }

});
