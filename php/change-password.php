<?php
    include "conn.php";

    $currentPassword = $_POST['current_password'];
    $newPassowrd = $_POST['new_password'];
    $userId = intval($_POST['user_id']);

    $queryPasswordCheck = "SELECT Password
                            FROM users
                            WHERE id = $userId AND Password = '$currentPassword';";
    
    $resultPasswordCheck = mysqli_query($conn, $queryPasswordCheck);

    if (mysqli_num_rows($resultPasswordCheck) > 0) {
        $queryChangePassword = "UPDATE users SET Password = '$newPassowrd' WHERE id = $userId;";
        $resultChangePassword = mysqli_query($conn, $queryChangePassword);
        if($resultChangePassword){
            echo "success";
        } else {
            echo "something went wrong";
        }

    } else {
        echo "wrong password";
    }
?>