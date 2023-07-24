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
    sessionStorage.clear();
    firstName = null;
    lastName = null;
    id = null;
    username.innerText = "";
    window.location.href = "./index.html";
});

class item {
    constructor(name, price, imagePathway, altText, transactionId, amountPaid) {
        this.name = name;
        this.price = price;
        this.imagePathway = imagePathway;
        this.altText = altText;
        this.transactionId = transactionId;
        this.amountPaid = amountPaid;
    }
}

let previousPurchasesList = document.getElementById("history-list");
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("POST", "./php/history.php", true);
xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // to make parameters url encoded
xmlHttpRequest.onload = () => {
    if (xmlHttpRequest.status === 200) {
        let result = xmlHttpRequest.responseText.split("*"); // * is separating between each row
        result.pop();
        let items = [];
        for (let index = 0; index < result.length; index++) {
            let singleItem = result[index].split("-"); // - is separating between each column
            let itemObject = new item(singleItem[0], singleItem[1], singleItem[2], singleItem[3], singleItem[4], singleItem[5]);
            items.push(itemObject);
        }

        let transactions = {};
        for (let index = 0; index < items.length; index++) {
            let transactionId = items[index]["transactionId"];
            if (!transactions[transactionId]) {
                transactions[transactionId] = [];
            }
            transactions[transactionId].push(items[index]);
        }
        
        for (let key in transactions) {            
            let transactionList = document.createElement("li"); // list for items in each transaction     
            let separatorHorizontalLine = document.createElement("hr");    
            transactionList.appendChild(separatorHorizontalLine);
            let transactionNumber = document.createElement("p");
            transactionNumber.classList.add("transaction-header");
            transactionNumber.innerText = "Transaction Number: " + key;
            transactionList.appendChild(transactionNumber);
            let transactionItemList = document.createElement("ul");
            transactionItemList.classList.add("shopping-history");

            for (index = 0; index < transactions[key].length; index++) {
                let listItem = document.createElement("li");
                listItem.classList.add("card", "shopping-grid-item");

                let itemImage = document.createElement("img"); // adding image to the list
                itemImage.setAttribute("src", transactions[key][index]["imagePathway"]);
                itemImage.setAttribute("alt", transactions[key][index]["altText"]);
                itemImage.classList.add("card-img-top");
                listItem.appendChild(itemImage);

                let itemDiv = document.createElement("div");
                itemDiv.classList.add("card-body");

                let itemTitle = document.createElement("p"); // adding shopping item title to the list
                itemTitle.classList.add("card-title");
                itemTitle.innerText = transactions[key][index]["name"];
                itemDiv.appendChild(itemTitle);

                let itemPrice = document.createElement("p"); // adding shopping item price
                itemPrice.classList.add("card-text");
                itemPrice.innerText = "C$" + transactions[key][index]["price"];
                itemDiv.appendChild(itemPrice);

                listItem.appendChild(itemDiv);
                transactionItemList.appendChild(listItem);
            }

            transactionList.appendChild(transactionItemList);

            let totalAmountPaid = document.createElement("p");
            totalAmountPaid.classList.add("transaction-total-amount");
            totalAmountPaid.innerText = "Total: " + transactions[key][0]["amountPaid"];
            transactionList.appendChild(totalAmountPaid);

            previousPurchasesList.appendChild(transactionList)
        }
        let endHorizontalLine = document.createElement("hr");
        previousPurchasesList.appendChild(endHorizontalLine);
    } else {
        alert("can't connect to history.php")
    }
}

let params = "user_id=" + userId;
xmlHttpRequest.send(params);