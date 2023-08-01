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

let items = []; // will contain all items
let shoppingList = document.getElementById("shopping-items");
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("POST", "./php/items.php", true);
xmlHttpRequest.onload = () => {
    if (xmlHttpRequest.status === 200) {
        items = JSON.parse(xmlHttpRequest.responseText);
        for (let object of items) {
            let listItem = document.createElement("li");
            listItem.classList.add("card", "shopping-grid-item");
            listItem.id = "shopping-item-id-" + object["id"];

            let itemImage = document.createElement("img"); // adding image to the list
            itemImage.setAttribute("src", object["Image_Pathway"]);
            itemImage.setAttribute("alt", object["Alt-Text"]);
            itemImage.classList.add("card-img-top");
            listItem.appendChild(itemImage);

            let itemDiv = document.createElement("div");
            itemDiv.classList.add("card-body");

            let itemTitle = document.createElement("p"); // adding shopping item title to the list
            itemTitle.classList.add("card-title");
            itemTitle.innerText = object["Item_Name"];
            itemDiv.appendChild(itemTitle);

            let itemPrice = document.createElement("p"); // adding shopping item price
            itemPrice.classList.add("card-text");
            itemPrice.innerText = "C$" + object["Price"];
            itemDiv.appendChild(itemPrice);

            let addToCartButton = document.createElement("button"); // adding add to cart button
            addToCartButton.setAttribute("onclick", "itemButtonClicked(this)");
            addToCartButton.id = "itemButton-" + object["id"];
            addToCartButton.classList.add("btn", "btn-primary", "btn-control");
            addToCartButton.innerText = "Add To Cart";
            itemDiv.appendChild(addToCartButton);

            listItem.appendChild(itemDiv);
            shoppingList.appendChild(listItem);
        }
    } else {
        alert("Can't connect to php");
    }
}

xmlHttpRequest.send();

// when clicking add to cart
function itemButtonClicked(itemButton) {
    if (userId !== null) {
        let itemButtonId = itemButton.id.split("-");
        let itemId = itemButtonId[1];
        let xmlHttpRequestAddToCart = new XMLHttpRequest();
        xmlHttpRequestAddToCart.open("POST", "./php/cart-post.php", true); // adding item to cart
        xmlHttpRequestAddToCart.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded

        xmlHttpRequestAddToCart.onload = () => {
            if (xmlHttpRequestAddToCart.status === 200) {
                if (xmlHttpRequestAddToCart.responseText == "success") {
                    getCartCount();
                } else {
                    alert("Item not available, try again later");
                }

            } else {
                alert("Can't connect to cart-post php");
            }

        }
        let params = "item_id=" + itemId + "&user_id=" + userId;
        xmlHttpRequestAddToCart.send(params);
    } else {
        window.location.href = "./login.html";
    }

}

// min and max price input
function checkInput(event) {
    let input = event.key;
    let numberRegEx = /\d/;
    let isNumber = numberRegEx.test(input);
    let isBackspaceOrDelete = ["Backspace", "Delete"].includes(input);
    if (!isNumber && !isBackspaceOrDelete) {
        event.preventDefault();
    }
}


// search form
let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let searchInput = document.getElementById("search-bar").value.toLowerCase().trim();
    let searchsex = document.getElementById("sex-list").value.toLowerCase();
    let searchCategory = document.getElementById("category-list").value.toLowerCase();
    let searchMin = document.getElementById("min-price").value;
    let searchMax = document.getElementById("max-price").value;
    for (let object of items) {
        let shoppingItemName = object["Item_Name"].toLowerCase();
        let shoppingItemId = "shopping-item-id-" + object["id"];
        let shoppingItemElement = document.getElementById(shoppingItemId);
        let shoppingItemsex = object["Sex"].toLowerCase();
        let shoppingItemCategory = object["Category"].toLowerCase();
        let shoppingItemPrice = object["Price"];
        if (
            shoppingItemName.includes(searchInput)
            && (shoppingItemsex == searchsex || searchsex == "both" || searchsex == "sex")
            && (shoppingItemCategory == searchCategory || searchCategory == "show all" || searchCategory == "category")
            && ((shoppingItemPrice > searchMin || searchMin == "") && (shoppingItemPrice < searchMax || searchMax == ""))
        ) {
            shoppingItemElement.style.display = "inline";
        } else {
            shoppingItemElement.style.display = "none";
        }

    }
})