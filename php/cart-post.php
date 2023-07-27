<?php
    include "conn.php";

    $itemId = intval($_POST['item_id']);
    $userId = intval($_POST['user_id']);

    if(isset($_POST['source'])){ // delete from or add to cart
        $query = "DELETE FROM SIRAJ_STORE_CARTS WHERE User_Id = $userId AND Item_Id = $itemId AND End_Date IS NULL LIMIT 1;";
    } else {
        $query = "INSERT INTO SIRAJ_STORE_CARTS(User_Id, Item_Id, Start_Date) VALUES($userId, $itemId, NOW());";
    }    

    $result = mysqli_query($conn, $query);

    if($result){
        echo "success";
    }
?>