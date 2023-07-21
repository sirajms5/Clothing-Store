<?php
include 'conn.php';

$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$address = $_POST['address'];
$dateOfBird = $_POST['date-of-birth'];
$email = $_POST['email'];
$password = $_POST['password'];

$queryCheckEmail = "SELECT Email FROM users WHERE email = '$email';";
$resultCheckEmail = mysqli_query($conn, $queryCheckEmail);

if (mysqli_num_rows($resultCheckEmail) == 0) {
    $encryptedPassword = md5($password); // encrypting the password
    $queryRegistration = "INSERT INTO USERS(
                                            First_Name,
                                            Last_Name,
                                            Address,
                                            Date_Of_Birth,
                                            Email,
                                            Password
                                        ) 
                                    VALUES ('$firstName', '$lastName', '$address', '$dateOfBird', '$email', '$encryptedPassword');";
    $resultRegistration = mysqli_query($conn, $queryRegistration);

    $querySelectNewId = "SELECT id FROM USERS WHERE email = '$email';";
    $resultSelectNewId = mysqli_query($conn, $querySelectNewId);
    $data = mysqli_fetch_all($resultSelectNewId, MYSQLI_ASSOC);

    $toReturn = "";
    foreach($data as $row){
        $toReturn = $toReturn . $row['id'];
    }
    echo $toReturn;
} else {
    echo "email already registered";
}
?>