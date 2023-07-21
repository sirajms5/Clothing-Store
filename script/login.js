let loginButton = document.getElementById("button-log-in");
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    // create if condition that wraps all connection if fields are filled
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "./php/login.php", true);

    xmlHttpRequest.onload = () => {
        if(xmlHttpRequest.status === 200){
            if(xmlHttpRequest.responseText != "Unregistered email"){
                let result = xmlHttpRequest.responseText.split("-");              
                let firstName = result[0];
                let lastName = result[1];
                let id = result[2];
                sessionStorage.setItem("first-name", firstName);
                sessionStorage.setItem("last-name", lastName);
                sessionStorage.setItem("id", id);
                window.location.href = "./index.html";
            } else {
                console.log(xmlHttpRequest.responseText);
                document.getElementById("email-error").style.display = "inline";
            }
        } else {
            alert("failure");
        }
    }
    xmlHttpRequest.send(new FormData(document.getElementById("log-in-form")));
});
