<?php
include 'conn.php';

$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$address = $_POST['address'];
$dateOfBird = $_POST['date-of-birth'];
$email = $_POST['email'];
$password = $_POST['password'];

$queryCheckEmail = "SELECT Email FROM SIRAJ_STORE_USERS WHERE email = '$email';";
$resultCheckEmail = mysqli_query($conn, $queryCheckEmail);
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if (mysqli_num_rows($resultCheckEmail) == 0) {
    $queryRegistration = "INSERT INTO SIRAJ_STORE_USERS(
                                            First_Name,
                                            Last_Name,
                                            Address,
                                            Date_Of_Birth,
                                            Email,
                                            Password
                                        ) 
                                    VALUES ('$firstName', '$lastName', '$address', '$dateOfBird', '$email', '$hashedPassword');";
                                    
    $resultRegistration = mysqli_query($conn, $queryRegistration);

    $querySelectNewId = "SELECT id FROM SIRAJ_STORE_USERS WHERE email = '$email';";
    $resultSelectNewId = mysqli_query($conn, $querySelectNewId);
    $data = mysqli_fetch_assoc($resultSelectNewId);
    
    echo $data['id'];
} else {
    echo "email already registered";
}
?>