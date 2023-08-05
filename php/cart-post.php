<?php
    include "conn.php";

    if (isset($conn)) {
        try {
            $itemId = intval(getData('item_id'));
            $userId = intval(getData('user_id'));
            if(isset($_POST['source'])){ // delete from or add to cart
                $query = "DELETE FROM SIRAJ_STORE_CARTS WHERE User_Id = $userId AND Item_Id = $itemId AND End_Date IS NULL LIMIT 1;";
            } else {
                $query = "INSERT INTO SIRAJ_STORE_CARTS(User_Id, Item_Id, Start_Date) VALUES($userId, $itemId, NOW());";
            }  

            $result = mysqli_query($conn, $query);
            if($result){
                echo "success";
            }            
        } catch (Exception $exception) {
            echo "Error in cart-post.php: " . $exception->getMessage();
            error_log("Error in cart-post.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
        
        mysqli_close($conn);    
    } else {
        echo "no connection";
    }
    
?>