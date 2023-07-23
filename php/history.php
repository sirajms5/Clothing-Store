<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);

    $queryPreviousPurchases = "SELECT items.Item_Name, items.Price, items.Image_Pathway, items.Alt_Text, carts.Transaction_Id, transactions.Amount_Paid
                                FROM items
                                JOIN carts ON carts.Item_Id = items.id
                                JOIN transactions ON carts.Transaction_Id = transactions.id
                                JOIN users ON users.id = transactions.User_Id
                                WHERE users.id = $userId AND carts.End_Date IS NOT NULL;";

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