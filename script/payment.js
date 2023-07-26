let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let userId = sessionStorage.getItem("id");

let username = document.getElementById("logged-in-name");
let cartCountElement = document.getElementsByClassName("cart-count");
let amountDueElement = document.getElementById("amount-due");
let cartContentDetails = document.getElementById("cart-contents");
let amountDueSection = document.getElementById("amount-due-section");
let cartCountSection = document.getElementById("cart-count-section");
let shoppingList = document.getElementById("shopping-items");

// checking if user is logged in
if (firstName != null && lastName != null) {
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("shopping-cart").style.display = "inline";
    username.classList.add("dropdown-toggle");
    username.innerText = firstName + " " + lastName;
}

// sing out button
let signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", () => {
    document.getElementById("log-in").style.display = "inline";
    document.getElementById("register").style.display = "inline";
    sessionStorage.clear();
    firstName = null;
    lastName = null;
    id = null;
    username.innerText = "";
    window.location.href = "./index.html";
});

// get cart count
let isPaid = false;
function getCartCount() {
    xmlHttpRequestGetCartCount = new XMLHttpRequest();
    xmlHttpRequestGetCartCount.open("POST", "./php/cart-count.php", true);
    xmlHttpRequestGetCartCount.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded                    
    xmlHttpRequestGetCartCount.onload = () => {
        if (xmlHttpRequestGetCartCount.status === 200) {
            let cartCount = parseInt(xmlHttpRequestGetCartCount.responseText);
            let cartCountArray = Array.from(cartCountElement);
            let paymentSection = document.getElementById("payment-section-content");
            if (cartCount <= 0) {
                amountDueSection.style.display = "none";
                cartCountSection.style.display = "none";
                cartCountArray[0].style.display = "none"; // will hide the cart number in the nav bar
                shoppingList.style.display = "none";
                paymentSection.style.display = "none";

                if (!isPaid) {
                    let emptyCart = document.createElement("p");
                    emptyCart.classList.add("secondary-title");
                    emptyCart.innerText = "Cart is Empty";
                    cartContentDetails.appendChild(emptyCart);
                }
            } else if (cartCount <= 99) {
                paymentSection.style.display = "block";
                cartCountArray.forEach(element => {
                    element.innerText = "(" + cartCount + ")";
                });

            } else {
                paymentSection.style.display = "block";
                cartCountArray.forEach(element => {
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

let amountDue = 0;
function getPaymentAmount(arrayOfItems) {
    amountDue = 0;
    arrayOfItems.forEach(index => {
        amountDue = amountDue + parseFloat(index["price"]);
    });

    return amountDue.toFixed(2); // showing only two decimal points
}

let items = []; // will contain all items
function getCartItems() {
    items = []; // resetting items array
    shoppingList.innerText = ""; // resetting list
    let xmlHttpRequestCartItems = new XMLHttpRequest();
    xmlHttpRequestCartItems.open("POST", "./php/items.php", true);
    xmlHttpRequestCartItems.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
    xmlHttpRequestCartItems.onload = () => {
        if (xmlHttpRequestCartItems.status === 200) {
            let result = xmlHttpRequestCartItems.responseText.split("*"); // * is separating between each row
            result.pop();
            for (let index = 0; index < result.length; index++) {
                let singleItem = result[index].split("-"); // - is separating between each column
                let itemObject = new item(singleItem[0], singleItem[1], singleItem[2], singleItem[3], singleItem[4], singleItem[5], singleItem[6]);
                items.push(itemObject);
            }

            for (let index = 0; index < items.length; index++) {
                let listItem = document.createElement("li");
                listItem.classList.add("card", "shopping-grid-item");
                listItem.id = "list-item-" + items[index]["id"];

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
                addToCartButton.classList.add("btn", "btn-danger");
                addToCartButton.innerText = "Remove From Cart";
                itemDiv.appendChild(addToCartButton);

                listItem.appendChild(itemDiv);
                shoppingList.appendChild(listItem);
            }

            amountDueElement.innerText = "C$" + getPaymentAmount(items);
        } else {
            alert("Can't connect to php");
        }

    }

    let params = "user_id=" + userId;
    xmlHttpRequestCartItems.send(params);
}

getCartItems();

function itemButtonClicked(itemButton) {
    let itemButtonId = itemButton.id.split("-");
    let itemId = itemButtonId[1];
    let xmlHttpRequestRemoveFromCart = new XMLHttpRequest();
    xmlHttpRequestRemoveFromCart.open("POST", "./php/cart-post.php", true); // adding item to cart
    xmlHttpRequestRemoveFromCart.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded

    xmlHttpRequestRemoveFromCart.onload = () => {
        if (xmlHttpRequestRemoveFromCart.status === 200) {
            if (xmlHttpRequestRemoveFromCart.responseText == "success") {
                let deleteItemElement = document.getElementById("list-item-" + itemId);
                // removing item from the items array
                for (let index = 0; index < items.length; index++) {
                    if (items[index]["id"] == itemId) {
                        items.splice(index, 1);
                        break; // will break out of the loop to not delete more than one item per click
                    }
                };
                deleteItemElement.remove();
                getCartCount();
                amountDueElement.innerText = "C$" + getPaymentAmount(items);
            } else {
                alert("Item not available, try again later");
            }

        } else {
            alert("Can't connect to cart-post php");
        }

    }
    let params = "item_id=" + itemId + "&user_id=" + userId + "&source=delete";
    xmlHttpRequestRemoveFromCart.send(params);
}

class itemBought {
    constructor(name, price, transactionId) {
        this.name = name;
        this.price = price;
        this.transactionId = transactionId;
    }
}

let cardName = document.getElementById("name-on-card");
let cardNumber = document.getElementById("card-number");

// card number input control
cardNumber.addEventListener("keydown", (event) => {
    let input = event.key;
    let numberRegEx = /\d/;
    let isNumber = numberRegEx.test(input);
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    let cardNumberValue = cardNumber.value.trim();
    if (!isNumber || cardNumberValue.length > 15) { // length will increase after the function ends
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// card expiration date input control
let cardExpirationDate = document.getElementById("card-expiration-date");
cardExpirationDate.addEventListener("keydown", (event) => {
    let input = event.key;
    let numberRegEx = /[\d\/]/;
    let isNumber = numberRegEx.test(input);
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    let cardExpirationDateValue = cardExpirationDate.value.trim();

    if (!isNumber || cardExpirationDateValue.length > 4) { // length will increase after the function ends
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

// card cvc number input control
let cardCvcNumber = document.getElementById("card-cvc-number");
cardCvcNumber.addEventListener("keydown", (event) => {
    let input = event.key;
    let numberRegEx = /\d/;
    let isNumber = numberRegEx.test(input);
    let isBackspaceOrDelete = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(input);
    let cardCvcNumberValue = cardCvcNumber.value.trim();

    if (!isNumber || cardCvcNumberValue.length > 2) { // length will increase after the function ends
        if (!isBackspaceOrDelete) {
            event.preventDefault();
        }
    }
})

let cardNameError = document.getElementById("card-name-error");
let cardNumberError = document.getElementById("card-number-error");
let cardExpirationError = document.getElementById("card-expiration-error");
let cardCvcError = document.getElementById("card-cvc-error");
let paymentButton = document.getElementById("button-payment");
paymentButton.addEventListener("click", (event) => {
    event.preventDefault();
    let cardNameValue = cardName.value.trim();
    let cardNumberValue = cardNumber.value.trim();
    let cardExpirationDateValue = cardExpirationDate.value.trim();
    let cardCvcNumberValue = cardCvcNumber.value.trim();
    let exiprationForamtRegEx = /^\d\d[\/]\d\d$/;
    let months = ["01", "02", "03", "04", "05", "01", "02", "03", "04", "05", "11", "12"];
    let isMonth = months.includes(cardExpirationDateValue.substr(0, 2));
    if (
        cardNameValue != ""
        && cardNumberValue.length == 16
        && (exiprationForamtRegEx.test(cardExpirationDateValue) && isMonth)
        && cardCvcNumberValue.length == 3
    ) {
        cardNameError.style.display = "none";
        cardNumberError.style.display = "none";
        cardExpirationError.style.display = "none";
        cardCvcError.style.display = "none";
        let xmlHttpRequestPayment = new XMLHttpRequest();
        xmlHttpRequestPayment.open("POST", "./php/payment.php", true);
        xmlHttpRequestPayment.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
        xmlHttpRequestPayment.onload = () => {
            if (xmlHttpRequestPayment.status === 200) {
                if (xmlHttpRequestPayment.responseText !== null) {
                    isPaid = true;
                    getCartItems();
                    getCartCount();
                    amountDueElement.innerText = "C$" + getPaymentAmount(items);
                    cartContentDetails.innerText = "";

                    // show receipt
                    let result = xmlHttpRequestPayment.responseText.split("*"); // * is separating between each row                
                    result.pop();
                    let receiptItems = [];
                    for (let index = 0; index < result.length; index++) {
                        let singleItem = result[index].split("-"); // - is separating between each column
                        let itemObject = new itemBought(singleItem[0], singleItem[1], singleItem[2]);
                        receiptItems.push(itemObject);
                    }

                    let receiptElement = document.createElement("div");
                    receiptElement.classList.add("receipt");
                    let receiptHeader = document.createElement("p");
                    receiptHeader.innerText = "Thank you for your purchase"
                    receiptHeader.classList.add("secondary-title");
                    receiptElement.appendChild(receiptHeader);

                    let transactionNumber = document.createElement("p");
                    transactionNumber.classList.add("receipt-transaction");
                    transactionNumber.innerText = "Transaction ID: " + receiptItems[0]["transactionId"];
                    receiptElement.appendChild(transactionNumber);

                    for (let index = 0; index < receiptItems.length; index++) {
                        let itemDetails = document.createElement("div");
                        itemDetails.classList.add("receipt-item");

                        let itemName = document.createElement("span");
                        itemName.innerText = receiptItems[index]["name"];
                        itemDetails.appendChild(itemName);

                        let itemPrice = document.createElement("span");
                        itemPrice.innerText = "C$" + receiptItems[index]["price"];
                        itemDetails.appendChild(itemPrice);

                        receiptElement.appendChild(itemDetails);
                    }

                    let totalDiv = document.createElement("div");
                    totalDiv.classList.add("receipt-item", "receipt-total");

                    let totalTitle = document.createElement("span");
                    totalTitle.innerText = "Total";
                    totalDiv.appendChild(totalTitle);

                    let totalAmount = document.createElement("span");
                    totalAmount.innerText = "C$" + getPaymentAmount(receiptItems);
                    totalDiv.appendChild(totalAmount);

                    receiptElement.appendChild(totalDiv);
                    cartContentDetails.appendChild(receiptElement);

                } else {
                    alert("payment declined");
                }

            } else {
                alert("Can't connect to payment php")
            }

        }

        let params = "user_id=" + userId + "&payment=" + amountDue;
        xmlHttpRequestPayment.send(params);
    } else {
        if (cardNameValue == "") {
            cardNameError.style.display = "inline";
        } else {
            cardNameError.style.display = "none";
        }

        if (cardNumberValue.length != 16) {
            cardNumberError.style.display = "inline";
        } else {
            cardNumberError.style.display = "none";
        }

        if (!(exiprationForamtRegEx.test(cardExpirationDateValue) && isMonth)) {
            cardExpirationError.style.display = "inline";
        } else {
            cardExpirationError.style.display = "none";
        }

        if (cardCvcNumberValue.length != 3) {
            cardCvcError.style.display = "inline";
        } else {
            cardCvcError.style.display = "none";
        }
    }

});