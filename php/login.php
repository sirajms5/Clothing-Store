<?php
    include 'conn.php';

    $email = $_POST['email'];
    $password = $_POST['password'];

    $queryCheckEmail = "SELECT First_Name, Last_Name, id, Password FROM users WHERE email = '$email';";
    $resultCheckEmail = mysqli_query($conn, $queryCheckEmail);

    if(mysqli_num_rows($resultCheckEmail) > 0){
        $data = mysqli_fetch_assoc($resultCheckEmail);
        $hashedPassword = $data['Password'];

        if(password_verify($password, $hashedPassword)){
                $toReturn = ""; 
                $toReturn = $data['First_Name'] . "-" . $data['Last_Name'] . "-" . $data['id'];
                echo $toReturn;
            } else {
            echo "wrong password";
            
        }
    } else {
        echo "unregistered email";
    }

        
?>