<?php
    include "conn.php";        

    if (isset($conn)) {
        try {
            $userId = intval(getData('user_id'));
            $query = "SELECT COUNT(User_Id) AS 'count' FROM SIRAJ_STORE_CARTS WHERE User_Id = $userId AND End_Date IS NULL;";
            $result = mysqli_query($conn, $query);
            $data = mysqli_fetch_assoc($result);
            echo $data['count'];
        } catch (Exception $exception) {
            echo "Error in cart-count.php: " . $exception->getMessage();
            error_log("Error in cart-count.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
        
        mysqli_close($conn);    
    } else {
        echo "no connection";
    }    
    
?>