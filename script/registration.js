let registrationButton = document.getElementById("button-register");
registrationButton.addEventListener("click", (event) => {
    event.preventDefault();
    // create if condition that wraps all connection if fields are filled
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "./php/registration.php", true);

    xmlHttpRequest.onload = () => {
        if(xmlHttpRequest.status === 200){
            if(xmlHttpRequest.responseText == "success"){
                let firstName = document.getElementById("first-name").value;
                let lastName = document.getElementById("last-name").value;
                sessionStorage.setItem("first-name", firstName);
                sessionStorage.setItem("last-name", lastName);
                window.location.href = "./index.html";
            } else {
                document.getElementById("username-error").style.display = "inline";
            }
        } else {
            alert("failure");
        }
    }
    xmlHttpRequest.send(new FormData(document.getElementById("registration-form")));
});
