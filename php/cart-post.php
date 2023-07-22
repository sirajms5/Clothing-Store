<?php
    include "conn.php";

    $itemId = intval($_POST['item_id']);
    $userId = intval($_POST['user_id']);

    $queryInsertIntoCarts = "INSERT INTO carts(User_Id, Item_Id, Start_Date) VALUES($userId, $itemId, NOW());";

    $result = mysqli_query($conn, $queryInsertIntoCarts);

    if($result){
        echo "added";
    }
?>