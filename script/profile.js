let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let userId = sessionStorage.getItem("id");

let username = document.getElementById("logged-in-name");
let cartCountElement = document.getElementsByClassName("cart-count");

// checking if user is logged in
if (firstName != null && lastName != null) {
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("shopping-cart").style.display = "inline";
    username.classList.add("dropdown-toggle");
    username.innerText = firstName + " " + lastName;
} else { // if user is not logged in
    window.location.href = "./index.html";
}

// alert to tell customer that we are having issues
function errorAlert() {
    alert("OOPS! Something went wrong. Please try again later.");
}

// get cart count
function getCartCount() {
    xmlHttpRequestGetCartCount = new XMLHttpRequest();
    xmlHttpRequestGetCartCount.open("POST", "./php/cart-count.php", true);
    xmlHttpRequestGetCartCount.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded                    
    xmlHttpRequestGetCartCount.onload = () => {
        if (xmlHttpRequestGetCartCount.status === 200) {
            let numberRegEx = /^\d+$/;
            let requestResponeText = xmlHttpRequestGetCartCount.responseText;
            if (requestResponeText != "no connection" && numberRegEx.test(requestResponeText)) {
                let cartCount = parseInt(requestResponeText);
                let cartCountArray = Array.from(cartCountElement);
                if (cartCount <= 0) {
                    cartCountArray[0].style.display = "none"; // will hide the cart number in the nav bar
                } else if (cartCount <= 99) {
                    cartCountArray.forEach(element => {
                        cartCountArray[0].style.display = "inline";
                        element.innerText = "(" + cartCount + ")";
                    });

                } else {
                    cartCountArray.forEach(element => {
                        cartCountArray[0].style.display = "inline";
                        element.innerText = "(99+)";
                    });
                }

            } else if (requestResponeText == "no connection") {
                console.error("failed to connect to the database from cart-count.php");
                errorAlert();
            } else {
                console.error(requestResponeText);
                errorAlert();
            }

        } else {
            console.error("can't connect to cart-count php");
            errorAlert();
        }

    }

    let params = "user_id=" + userId;
    xmlHttpRequestGetCartCount.send(params);
}


getCartCount();

// sing out button
let signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", () => {
    document.getElementById("log-in").style.display = "inline";
    document.getElementById("register").style.display = "inline";
    document.getElementById("shopping-cart").style.display = "none";
    sessionStorage.clear();
    firstName = null;
    lastName = null;
    id = null;
    username.innerText = "";
    username.classList.remove("dropdown-toggle");
    window.location.href = "./index.html";
});

// getting user details
let xmlHttpRequestGetProfileDetails = new XMLHttpRequest();
xmlHttpRequestGetProfileDetails.open("POST", "./php/profile.php", true);
xmlHttpRequestGetProfileDetails.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
xmlHttpRequestGetProfileDetails.onload = () => {
    if (xmlHttpRequestGetProfileDetails.status === 200) {
        let result = JSON.parse(xmlHttpRequestGetProfileDetails.responseText);
        if (!result.hasOwnProperty("error")) {
            document.getElementById("first-name").innerText = result["First_Name"];
            document.getElementById("last-name").innerText = result["Last_Name"];
            document.getElementById("address").innerText = result["Address"];
            document.getElementById("date-of-birth").innerText = result["Date_Of_Birth"];
            document.getElementById("email").innerText = result["Email"];
        } else {
            console.error(result["error"]);
            errorAlert();
        }
    } else {
        console.error("can't connect to profile.php");
        errorAlert();
    }
}

let params = "user_id=" + userId;
xmlHttpRequestGetProfileDetails.send(params);

let currentPasswordElement = document.getElementById("current-password");
let newPasswordElement = document.getElementById("new-password");
let reNewPasswordElement = document.getElementById("re-new-password");

// password input limit control
currentPasswordElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (currentPasswordElement.value.length > 29) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// new password input limit control
newPasswordElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (newPasswordElement.value.length > 29) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// re new password input limit control
reNewPasswordElement.addEventListener("keydown", (event) => {
    let input = event.key;
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    if (reNewPasswordElement.value.length > 29) { // length increases after function finishes
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// changing user password button
let changePasswordButton = document.getElementById("change-password-button");
changePasswordButton.addEventListener("click", (event) => {
    event.preventDefault();
    let currentPasswordError = document.getElementById("current-password-error");
    let newPasswordError = document.getElementById("new-password-error");
    let reNewPasswordError = document.getElementById("re-new-password-error");
    let currentPassword = document.getElementById("current-password").value;
    let newPassword = document.getElementById("new-password").value;
    let reNewPassword = document.getElementById("re-new-password").value;
    let successMessage = document.getElementById("password-change-success");
    successMessage.style.display = "none";
    if (currentPassword.length >= 6 && newPassword.length >= 6 && (newPassword == reNewPassword)) {
        newPasswordError.style.display = "none";
        reNewPasswordError.style.display = "none";
        let xmlChangePassword = new XMLHttpRequest();
        xmlChangePassword.open("POST", "./php/change-password.php");
        xmlChangePassword.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
        xmlChangePassword.onload = () => {
            if (xmlChangePassword.status === 200) {
                if (xmlChangePassword.responseText == "success") {
                    successMessage.innerText = "Password has been changed successfully!";
                    successMessage.style.color = "green";
                    successMessage.style.display = "inline";
                    currentPasswordError.style.display = "none";
                    document.getElementById("change-password-form").reset();
                } else if (xmlChangePassword.responseText == ("wrong password")) {
                    currentPasswordError.innerText = "Wrong Password."
                    currentPasswordError.style.display = "inline";
                } else {
                    console.error("Error: Can't connect to database from change-password.php");
                    successMessage.style.color = "orange";
                    successMessage.innerText = "Please try again later.";
                    successMessage.style.display = "inline";
                    errorAlert();
                }
            } else {
                console.error("can't connect to change-password.php");
                successMessage.style.color = "orange";
                successMessage.innerText = "Please try again later.";
                successMessage.style.display = "inline";
                errorAlert();
            }
        }

        params = "current_password=" + currentPassword + "&new_password=" + newPassword + "&user_id=" + userId;
        xmlChangePassword.send(params);
    } else {
        if (currentPassword.length < 6) {
            currentPasswordError.innerText = "Password must be 6 or more characters."
            currentPasswordError.style.display = "inline";
        } else {
            currentPasswordError.style.display = "none";
        }

        if (newPassword.length < 6) {
            newPasswordError.style.display = "inline";
        } else {
            newPasswordError.style.display = "none";
        }

        if (reNewPassword != newPassword || reNewPassword.length < 6) {
            reNewPasswordError.style.display = "inline";
        } else {
            reNewPasswordError.style.display = "none";
        }

    }
})