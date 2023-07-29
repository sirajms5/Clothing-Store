<?php
    include 'conn.php';    

    // if true it will get user cart items otherwise all items
    if(isset($_POST['user_id'])){
        $userId = intval($_POST['user_id']);

        $query = "SELECT SIRAJ_STORE_ITEMS.id, SIRAJ_STORE_ITEMS.Item_Name, SIRAJ_STORE_ITEMS.Price, SIRAJ_STORE_ITEMS.Sex, SIRAJ_STORE_ITEMS.Category, SIRAJ_STORE_ITEMS.Image_Pathway, SIRAJ_STORE_ITEMS.Alt_Text
                    FROM SIRAJ_STORE_ITEMS
                    JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_ITEMS.id = SIRAJ_STORE_CARTS.Item_Id
                    JOIN SIRAJ_STORE_USERS ON SIRAJ_STORE_CARTS.User_Id = SIRAJ_STORE_USERS.id
                    WHERE User_Id = $userId AND End_Date IS NULL;";
    } else {
        $query = "SELECT * FROM SIRAJ_STORE_ITEMS;";
    }

    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if($data){        
        echo json_encode($data);
    } else {
        echo json_encode(array("empty" => "no items available"));
    }
?>