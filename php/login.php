<?php
    include 'conn.php';

    $email = $_POST['email'];
    $password = $_POST['password'];

    $queryCheckEmail = "SELECT First_Name, Last_Name, id, Password FROM SIRAJ_STORE_USERS WHERE email = '$email';";
    $resultCheckEmail = mysqli_query($conn, $queryCheckEmail);

    if(mysqli_num_rows($resultCheckEmail) > 0){
        $data = mysqli_fetch_assoc($resultCheckEmail);
        $hashedPassword = $data['Password'];

        if(password_verify($password, $hashedPassword)){
                echo json_encode($data);
            } else {
                echo json_encode(array("error" => "wrong password"));            
            }
        } else {
            echo json_encode(array("error" => "unregistered email"));
        }       
?>