<?php
    include "conn.php";

    $userId = $_POST['user_id'];

    $query = "SELECT First_Name, Last_Name, Address, Date_Of_Birth, Email
                FROM users
                WHERE id = $userId;";
    
    $result = mysqli_query($conn, $query);    

    if($result){
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $toReturn = "";
        foreach($data as $row){
            $toReturn = $toReturn . $row['First_Name']
                        . "*" . $row['Last_Name']
                        . "*" . $row['Address']
                        . "*" . $row['Date_Of_Birth']
                        . "*" . $row['Email'];
        }
        echo $toReturn;
    }
?>