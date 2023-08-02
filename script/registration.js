let firstNameElement = document.getElementById("first-name");
let lastNameElement = document.getElementById("last-name");
let addressElement = document.getElementById("address");
let dateOfBirthElement = document.getElementById("date-of-birth");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");

let firstNameError = document.getElementById("first-name-error");
let lastNameError = document.getElementById("last-name-error");
let addressError = document.getElementById("address-error");
let dateOfBirthError = document.getElementById("date-of-birth-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

// first name input limit control
firstNameElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (firstNameElement.value.length > 49) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// last name input limit control
lastNameElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (lastNameElement.value.length > 49) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// address input limit control
addressElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (addressElement.value.length > 254) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// email input limit control
emailElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (emailElement.value.length > 69) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// password input limit control
passwordElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (passwordElement.value.length > 29) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

let registrationButton = document.getElementById("button-register");
registrationButton.addEventListener("click", (event) => {
    event.preventDefault();
    let firstNameValue = firstNameElement.value.trim();
    let lastNameValue = lastNameElement.value.trim();
    let addressValue = addressElement.value.trim();
    let dateOfBirthValue = dateOfBirthElement.value;
    let emailValue = emailElement.value.trim();
    let emailRegEx = /^[^@.\s]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    let passwordValue = passwordElement.value;
    if (
        firstNameValue != ""
        && lastNameValue != ""
        && addressValue != ""
        && dateOfBirthValue != ""
        && emailRegEx.test(emailValue)
        && passwordValue.length >= 6
    ) {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", "./php/registration.php", true);

        xmlHttpRequest.onload = () => {
            if (xmlHttpRequest.status === 200) {
                dateOfBirthError.style.display = "none";
                if (xmlHttpRequest.responseText == "email already registered") {
                    emailError.innerText = "Email already registered.";
                    emailError.style.display = "inline";
                    firstNameError.style.display = "none";
                    lastNameError.style.display = "none";
                    addressError.style.display = "none";
                    passwordError.style.display = "none";
                } else {
                    let firstName = document.getElementById("first-name").value;
                    let lastName = document.getElementById("last-name").value;
                    let id = xmlHttpRequest.responseText;
                    sessionStorage.setItem("first-name", firstName);
                    sessionStorage.setItem("last-name", lastName);
                    sessionStorage.setItem("id", id);
                    window.location.href = "./index.html";
                }
            } else {
                alert("couldn't connect to registration.php");
            }
        }
        xmlHttpRequest.send(new FormData(document.getElementById("registration-form")));
    } else {
        if (firstNameValue == "") {
            firstNameError.style.display = "inline";
        } else {
            firstNameError.style.display = "none";
        }

        if (lastNameValue == "") {
            lastNameError.style.display = "inline";
        } else {
            lastNameError.style.display = "none";
        }

        if (addressValue == "") {
            addressError.style.display = "inline";
        } else {
            addressError.style.display = "none";
        }

        if (dateOfBirthValue == "") {
            dateOfBirthError.style.display = "inline";
        } else {
            dateOfBirthError.style.display = "none";
        }

        if (!emailRegEx.test(emailValue)) {
            emailError.innerText = "Email should be in xyz@xyz.xyz format.";
            emailError.style.display = "inline";
        } else {
            emailError.style.display = "none";
        }

        if (passwordValue.length < 6) {
            passwordError.style.display = "inline";
        } else {
            passwordError.style.display = "none";
        }
    }

});
