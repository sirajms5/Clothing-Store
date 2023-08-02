<?php
    include "conn.php";        

    if (isset($conn)) {
        $userId = intval(getData('user_id'));
        $query = "SELECT COUNT(User_Id) AS 'count' FROM SIRAJ_STORE_CARTS WHERE User_Id = $userId AND End_Date IS NULL;";
        $result = mysqli_query($conn, $query);
        $data = mysqli_fetch_assoc($result);
        mysqli_close($conn);
    
        echo $data['count'];
    }
    
?>