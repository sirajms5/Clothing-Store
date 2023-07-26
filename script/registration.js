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

emailElement.addEventListener("keydown", (event) => {
    if (emailElement.value.length > 69) { // length increases after function finishes
        event.preventDefault();
    }
})

passwordElement.addEventListener("keydown", (event) => {
    if (passwordElement.value.length > 29) { // length increases after function finishes
        event.preventDefault();
    }
})

let registrationButton = document.getElementById("button-register");
registrationButton.addEventListener("click", (event) => {
    event.preventDefault();
    let firstNameValue = firstNameElement.value;
    let lastNameValue = lastNameElement.value;
    let addressValue = addressElement.value;
    let dateOfBirthValue = dateOfBirthElement.value;
    let emailValue = emailElement.value;
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
