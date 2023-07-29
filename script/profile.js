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
}

// get cart count
function getCartCount() {
    xmlHttpRequestGetCartCount = new XMLHttpRequest();
    xmlHttpRequestGetCartCount.open("POST", "./php/cart-count.php", true);
    xmlHttpRequestGetCartCount.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded                    
    xmlHttpRequestGetCartCount.onload = () => {
        if (xmlHttpRequestGetCartCount.status === 200) {
            let cartCount = parseInt(xmlHttpRequestGetCartCount.responseText);
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

        } else {
            alert("can't connect to cart-count php")
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
        let result = JSON.parse(xmlHttpRequestGetProfileDetails.responseText)
        document.getElementById("first-name").innerText = result["First_Name"];
        document.getElementById("last-name").innerText = result["Last_Name"];
        document.getElementById("address").innerText = result["Address"];
        document.getElementById("date-of-birth").innerText = result["Date_Of_Birth"];
        document.getElementById("email").innerText = result["Email"];
    } else {
        alert("profile.php can't be reached");
    }
}

let params = "user_id=" + userId;
xmlHttpRequestGetProfileDetails.send(params);

let changePasswordButton = document.getElementById("change-password-button");
changePasswordButton.addEventListener("click", (event) => {
    event.preventDefault();
    let currentPasswordError = document.getElementById("current-password-error");
    let newPasswordError = document.getElementById("new-password-error");
    let reNewPasswordError = document.getElementById("re-new-password-error");
    let currentPassword = document.getElementById("current-password").value;
    let newPassword = document.getElementById("new-password").value;
    let reNewPassword = document.getElementById("re-new-password").value;
    if (newPassword.length >= 6 && (newPassword == reNewPassword)) {
        newPasswordError.style.display = "none";
        reNewPasswordError.style.display = "none";
        let xmlChangePassword = new XMLHttpRequest();
        xmlChangePassword.open("POST", "./php/change-password.php");
        xmlChangePassword.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
        xmlChangePassword.onload = () => {
            if (xmlChangePassword.status === 200) {
                if (xmlChangePassword.responseText == "success") {
                    document.getElementById("password-change-success").style.display = "inline";
                    currentPasswordError.style.display = "none";
                    document.getElementById("change-password-form").reset();
                } else {
                    currentPasswordError.style.display = "inline";
                }
            } else {
                alert("can't connect to change-password.php");
            }
        }

        params = "current_password=" + currentPassword + "&new_password=" + newPassword + "&user_id=" + userId;
        xmlChangePassword.send(params);
    } else {
        newPasswordError.style.display = "inline";
        reNewPasswordError.style.display = "inline";
    }
})