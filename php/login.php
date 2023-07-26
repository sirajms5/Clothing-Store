<?php
    include 'conn.php';

    $email = $_POST['email'];
    $password = $_POST['password'];

    $queryCheckEmail = "SELECT First_Name, Last_Name, id FROM users WHERE email = '$email';";
    $resultCheckEmail = mysqli_query($conn, $queryCheckEmail);

    if(mysqli_num_rows($resultCheckEmail) > 0){
        $querySelectUser = "SELECT First_Name, Last_Name, id FROM users WHERE email = '$email' AND Password = '$password';";
        $resultSelectUser = mysqli_query($conn, $querySelectUser);

        if(mysqli_num_rows($resultSelectUser) > 0){
            $data = mysqli_fetch_all($resultSelectUser, MYSQLI_ASSOC);

            if ($data) {     
                $toReturn = "";   
                foreach ($data as $row) {
                    $toReturn = $row['First_Name'] . "-" . $row['Last_Name'] . "-" . $row['id'];
                }
                echo $toReturn;
            }
        } else {
            echo "wrong password";
        }
    } else {
        echo "unregistered email";
    }

        
?>