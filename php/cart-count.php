<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);

    $query = "SELECT COUNT(User_Id) AS 'count' FROM carts WHERE User_Id = $userId AND End_Date IS NULL;";

    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_assoc($result);
    echo $data['count'];
?>