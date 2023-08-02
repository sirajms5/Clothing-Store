<?php
    include "conn.php";

    if (isset($conn)) {
        $userId = getData('user_id');
        $query = "SELECT First_Name,
                            Last_Name,
                            Address,
                            Date_Of_Birth,
                            Email
                    FROM SIRAJ_STORE_USERS
                    WHERE id = $userId;";    
        $result = mysqli_query($conn, $query);    
        if($result){
            $data = mysqli_fetch_assoc($result);
            
            echo json_encode($data);
        }
        
        mysqli_close($conn);
    }
?>