<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);

    $queryPreviousPurchases = "SELECT SIRAJ_STORE_ITEMS.Item_Name, SIRAJ_STORE_ITEMS.Price, SIRAJ_STORE_ITEMS.Image_Pathway, SIRAJ_STORE_ITEMS.Alt_Text, SIRAJ_STORE_CARTS.Transaction_Id, SIRAJ_STORE_TRANSACTIONS.Amount_Paid
                                FROM SIRAJ_STORE_ITEMS
                                JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_CARTS.Item_Id = SIRAJ_STORE_ITEMS.id
                                JOIN SIRAJ_STORE_TRANSACTIONS ON SIRAJ_STORE_CARTS.Transaction_Id = SIRAJ_STORE_TRANSACTIONS.id
                                JOIN SIRAJ_STORE_USERS ON SIRAJ_STORE_USERS.id = SIRAJ_STORE_TRANSACTIONS.User_Id
                                WHERE SIRAJ_STORE_USERS.id = $userId AND SIRAJ_STORE_CARTS.End_Date IS NOT NULL;";

    $resultPreviousPurchases = mysqli_query($conn, $queryPreviousPurchases);
    $data = mysqli_fetch_all($resultPreviousPurchases, MYSQLI_ASSOC);

    if($data){
        $toReturn = "";
        foreach($data as $row){
            $toReturn = $toReturn 
                . $row["Item_Name"] 
                . "-" . $row["Price"]
                . "-" . $row["Image_Pathway"] 
                . "-" . $row["Alt_Text"] 
                . "-" . $row["Transaction_Id"] 
                . "-" . $row["Amount_Paid"] 
                . "*";
        }
        
        echo $toReturn;
    } else {
        echo "No Previous Purchases";
    }
?>