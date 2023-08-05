<?php
    include 'conn.php';    

    if (isset($conn)) {
        try {
            if(isset($_POST['user_id'])){ // if true it will get user cart items otherwise all items
                $userId = intval(getData('user_id'));
                $query = "SELECT SIRAJ_STORE_ITEMS.id,
                                SIRAJ_STORE_ITEMS.Item_Name,
                                SIRAJ_STORE_ITEMS.Price,
                                SIRAJ_STORE_ITEMS.Sex,
                                SIRAJ_STORE_ITEMS.Category,
                                SIRAJ_STORE_ITEMS.Image_Pathway,
                                SIRAJ_STORE_ITEMS.Alt_Text
                            FROM SIRAJ_STORE_ITEMS
                            JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_ITEMS.id = SIRAJ_STORE_CARTS.Item_Id
                            JOIN SIRAJ_STORE_USERS ON SIRAJ_STORE_CARTS.User_Id = SIRAJ_STORE_USERS.id
                            WHERE User_Id = $userId AND End_Date IS NULL;";
            } else {
                $query = "SELECT * FROM SIRAJ_STORE_ITEMS;";
            }
    
            $result = mysqli_query($conn, $query);    
            if(mysqli_num_rows($result) > 0){        
                $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
                echo json_encode($data);
            } else {                
                echo json_encode(array("empty" => "no items available"));
            }
    
        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in items.php: " . $exception->getMessage()));
            error_log("Error in items.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);        
    } else {
        echo json_encode(array("error" => "no connection to database from items.php"));
    }

?>