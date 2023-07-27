<?php
    include "conn.php";

    $userId = $_POST['user_id'];

    $query = "SELECT First_Name, Last_Name, Address, Date_Of_Birth, Email
                FROM SIRAJ_STORE_USERS
                WHERE id = $userId;";
    
    $result = mysqli_query($conn, $query);    

    if($result){
        $data = mysqli_fetch_assoc($result);
            $toReturn = $data['First_Name']
                        . "*" . $data['Last_Name']
                        . "*" . $data['Address']
                        . "*" . $data['Date_Of_Birth']
                        . "*" . $data['Email'];
        echo $toReturn;
    }
?>