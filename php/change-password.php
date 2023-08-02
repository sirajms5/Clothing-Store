<?php
    include "conn.php";

    if (isset($conn)) {
        $currentPassword = getData('current_password');
        $newPassowrd = getDAta('new_password');
        $userId = intval(getData('user_id'));
        $queryPasswordCheck = "SELECT Password
                                FROM SIRAJ_STORE_USERS
                                WHERE id = $userId;";
    
        $resultPasswordCheck = mysqli_query($conn, $queryPasswordCheck);
        if (mysqli_num_rows($resultPasswordCheck) > 0) {
            $data = mysqli_fetch_assoc($resultPasswordCheck);
            $storedHashedPassword = $data['Password'];
            if(password_verify($currentPassword, $storedHashedPassword)){
                $hashedNewPassword = password_hash($newPassowrd, PASSWORD_DEFAULT);
                $queryChangePassword = "UPDATE SIRAJ_STORE_USERS SET Password = '$hashedNewPassword' WHERE id = $userId;";
                $resultChangePassword = mysqli_query($conn, $queryChangePassword);
                if($resultChangePassword){

                    echo "success";
                } else {

                    echo "something went wrong";
                }

            }      

        } else {

            echo "wrong password";
        }
        mysqli_close($conn);

    }
    
?>