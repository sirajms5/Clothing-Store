let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let id = sessionStorage.getItem("id");
let username = document.getElementById("logged-in-name");

// checking if user is logged in
if (firstName != null && lastName != null) {
    document.getElementById("log-in").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("sign-out").style.display = "inline";
    username.innerText = firstName + " " + lastName;
}

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
})

// item constructor
class item {
    constructor(id, name, price, sex, category, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.sex = sex;
        this.category = category;
        this.image = image;
    }
};

let items = []; // will contain all items
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("GET", "./php/home.php", true);
xmlHttpRequest.onload = () => {
    if (xmlHttpRequest.status === 200) {
        let result = xmlHttpRequest.responseText.split("*"); // * is separating between each row
        result.pop();
        for(let index = 0; index < result.length; index++){
            let singleItem = result[index].split("-"); // - is separating between each column
            let itemObject = new item(singleItem[0], singleItem[1], singleItem[2], singleItem[3], singleItem[4], singleItem[5]);
            items.push(itemObject);
        }
        
        
    } else {
        alert("Can't connect to php");
    }
}

xmlHttpRequest.send();

