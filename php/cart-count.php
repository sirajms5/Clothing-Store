<?php
    
    include "conn.php";        

    if (isset($conn)) {
        try {
            $userId = intval(getData('user_id'));
            $query = "SELECT COUNT(User_Id) AS 'count' FROM SIRAJ_STORE_CARTS WHERE User_Id = ? AND End_Date IS NULL;";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "i", $userId);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_bind_result($stmt, $count);
            mysqli_stmt_fetch($stmt);
            mysqli_stmt_close($stmt);
            echo $count;
        } catch (Exception $exception) {
            echo "Error in cart-count.php: " . $exception->getMessage();
            error_log("Error in cart-count.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
        
        mysqli_close($conn);    
    } else {
        echo "no connection";
    }    
    
?>