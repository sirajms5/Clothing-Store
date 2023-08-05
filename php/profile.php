<?php
    include "conn.php";

    if (isset($conn)) {
        try {            
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
        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in profile.php: " . $exception->getMessage()));
            error_log("Error in profile.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        } 
        
    } else {
        echo json_encode(array("error" => "no connection to database from profile.php"));
    }

    mysqli_close($conn);
?>