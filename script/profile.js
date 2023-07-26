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
                // cartContentDetails.style.display = "none";
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
});

// getting user details
let xmlHttpRequestGetProfileDetails = new XMLHttpRequest();
xmlHttpRequestGetProfileDetails.open("POST", "./php/profile.php", true);
xmlHttpRequestGetProfileDetails.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
xmlHttpRequestGetProfileDetails.onload = () => {
    if(xmlHttpRequestGetProfileDetails.status === 200){
        let result = xmlHttpRequestGetProfileDetails.responseText.split("*"); // * is column separator
        document.getElementById("first-name").innerText = result[0];
        document.getElementById("last-name").innerText = result[1];
        document.getElementById("address").innerText = result[2];
        document.getElementById("date-of-birth").innerText = result[3];
        document.getElementById("email").innerText = result[4];
    } else {
        alert("profile.php can't be reached");
    }
}

let params = "user_id=" + userId;
xmlHttpRequestGetProfileDetails.send(params);