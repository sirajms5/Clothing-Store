<?php
    include 'conn.php';    

    // if true it will get user cart items otherwise all items
    if(isset($_POST['user_id'])){
        $userId = intval($_POST['user_id']);

        $query = "SELECT items.id, items.Item_Name, items.Price, items.Sex, items.Category, items.Image_Pathway, items.Alt_Text
                    FROM items
                    JOIN carts ON items.id = carts.Item_Id
                    JOIN users ON carts.User_Id = users.id
                    WHERE User_Id = $userId AND End_Date IS NULL;";
    } else {
        $query = "SELECT * FROM items;";
    }

    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if($data){
        $toReturn = "";
        foreach($data as $row){
            $toReturn = $toReturn 
                . $row["id"] 
                . "-" . $row["Item_Name"] 
                . "-" . $row["Price"] 
                . "-" . $row["Sex"] 
                . "-" . $row["Category"] 
                . "-" . $row["Image_Pathway"] 
                . "-" . $row["Alt_Text"] 
                . "*";
        }
        
        echo $toReturn;
    } else {
        echo "Store is empty";
    }
?>