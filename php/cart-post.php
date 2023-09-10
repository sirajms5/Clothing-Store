<?php

    include "conn.php";

    if (isset($conn)) {
        try {
            $itemId = intval(getData('item_id'));
            $userId = intval(getData('user_id'));
            if (isset($_POST['source'])) { // delete from or add to cart
                $query = "DELETE FROM SIRAJ_STORE_CARTS WHERE User_Id = ? AND Item_Id = ? AND End_Date IS NULL LIMIT 1;";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "ii", $userId, $itemId);
            } else {
                $query = "INSERT INTO SIRAJ_STORE_CARTS(User_Id, Item_Id, Start_Date) VALUES(?, ?, NOW());";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "ii", $userId, $itemId);
            }
    
            if (mysqli_stmt_execute($stmt)) {
                echo "success";
            }
    
            mysqli_stmt_close($stmt);
        } catch (Exception $exception) {
            echo "Error in cart-post.php: " . $exception->getMessage();
            error_log("Error in cart-post.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
        
        mysqli_close($conn);    
    } else {
        echo "no connection";
    }
    
?>