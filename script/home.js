let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let userId = sessionStorage.getItem("id");

let username = document.getElementById("logged-in-name");
let cartCountElement = document.getElementsByClassName("cart-count");

// checking if user is logged in
if (firstName != null && lastName != null) {
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("sign-out").style.display = "inline";
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
    document.getElementById("sign-out").style.display = "none";
    sessionStorage.clear();
    firstName = null;
    lastName = null;
    id = null;
    username.innerText = "";
});

// item constructor
class item {
    constructor(id, name, price, sex, category, image, altText) { // add alt to the database content
        this.id = id;
        this.name = name;
        this.price = price;
        this.sex = sex;
        this.category = category;
        this.image = image;
        this.altText = altText;
    }
};

let items = []; // will contain all items
let shoppingList = document.getElementById("shopping-items");
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("POST", "./php/items.php", true);
xmlHttpRequest.onload = () => {
    if (xmlHttpRequest.status === 200) {
        let result = xmlHttpRequest.responseText.split("*"); // * is separating between each row
        result.pop();
        for (let index = 0; index < result.length; index++) {
            let singleItem = result[index].split("-"); // - is separating between each column
            let itemObject = new item(singleItem[0], singleItem[1], singleItem[2], singleItem[3], singleItem[4], singleItem[5], singleItem[6]);
            items.push(itemObject);
        }

        for (let index = 0; index < items.length; index++) {
            let listItem = document.createElement("li");
            listItem.classList.add("card", "shopping-grid-item");

            let itemImage = document.createElement("img"); // adding image to the list
            itemImage.setAttribute("src", items[index]["image"]);
            itemImage.setAttribute("alt", items[index]["altText"]);
            itemImage.classList.add("card-img-top");
            listItem.appendChild(itemImage);

            let itemDiv = document.createElement("div");
            itemDiv.classList.add("card-body");

            let itemTitle = document.createElement("p"); // adding shopping item title to the list
            itemTitle.classList.add("card-title");
            itemTitle.innerText = items[index]["name"];
            itemDiv.appendChild(itemTitle);

            let itemPrice = document.createElement("p"); // adding shopping item price
            itemPrice.classList.add("card-text");
            itemPrice.innerText = "C$" + items[index]["price"];
            itemDiv.appendChild(itemPrice);

            let addToCartButton = document.createElement("button"); // adding add to cart button
            addToCartButton.setAttribute("onclick", "itemButtonClicked(this)");
            addToCartButton.id = "itemButton-" + items[index]["id"];
            addToCartButton.classList.add("btn", "btn-primary");
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