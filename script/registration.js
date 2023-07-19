// let registrationButton = document.getElementById("button-register");
// registrationButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     // create if condition that wraps all connection if fields are filled
//     let xmlHttpRequest = new XMLHttpRequest();
//     xmlHttpRequest.open("GET", "./php/registration.php", true);

//     xmlHttpRequest.onload = () => {
//         if(xmlHttpRequest.status === 200){
//             alert(xmlHttpRequest.responseText);
//         } else {
//             alert("failure");
//         }
//     }
//     xmlHttpRequest.send(new FormData(document.getElementById("registration-form")));
// });

let registrationButton = document.getElementById("button-register");
registrationButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Create the query parameters based on form data
    const formData = new FormData(document.getElementById("registration-form"));
    const queryParams = new URLSearchParams(formData).toString();

    // Create the URL with query parameters
    const url = "./php/registration.php?" + queryParams;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);

    xmlHttpRequest.onload = () => {
        if (xmlHttpRequest.status === 200) {
            alert(xmlHttpRequest.responseText);
        } else {
            alert("Failure");
        }
    };
    
    xmlHttpRequest.send();
});
