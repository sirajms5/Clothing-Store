<?php
    include 'conn.php';

    if (isset($conn)) {
        $firstName = trim(getData('first-name'));
        $lastName = trim(getData('last-name'));
        $address = trim(getData('address'));
        $dateOfBird = getData('date-of-birth');
        $email = trim(getData('email'));
        $password = getData('password');
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

        mysqli_close($conn);
    }
?>