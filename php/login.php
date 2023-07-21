<?php
    include 'conn.php';

    $email = $_POST['email'];
    $password = $_POST['password'];

    $querySelectUser = "SELECT First_Name, Last_Name, id FROM users WHERE email = '$email' AND Password = '$password';";

    $result = mysqli_query($conn, $querySelectUser);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($data) {     
        $toReturn = "";   
        foreach ($data as $row) {
            $toReturn = $row['First_Name'] . "-" . $row['Last_Name'] . "-" . $row['id'];
        }
        echo $toReturn;
    } else {
        echo "Unregistered email";
    }    
?>