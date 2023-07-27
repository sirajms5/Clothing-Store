<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);
    $payment = floatval($_POST['payment']);

    $queryPayment = "INSERT INTO transactions(Amount_Paid, User_Id) VALUES($payment, $userId);";
    $resultPayment = mysqli_query($conn, $queryPayment);

    if($resultPayment){
        $queryUpdateUserCart = "UPDATE carts SET End_Date = NOW(), Transaction_Id = (SELECT MAX(id) FROM transactions) WHERE User_Id = $userId AND End_Date IS NULL;";
        $resultUpdateUserCart = mysqli_query($conn, $queryUpdateUserCart);
        if($resultUpdateUserCart){
            $queryGetReceipt = "SELECT items.Item_Name, items.Price, transactions.id
                                FROM items
                                JOIN carts ON items.id = carts.Item_Id
                                JOIN transactions ON carts.Transaction_Id = transactions.id
                                WHERE transactions.id = (SELECT MAX(id) FROM transactions WHERE User_Id = $userId);";

            $resultGetReceipt = mysqli_query($conn, $queryGetReceipt);
            $data = mysqli_fetch_all($resultGetReceipt, MYSQLI_ASSOC);
            if($data){
                $toReturn = "";
                foreach($data as $row){
                    $toReturn = $toReturn 
                        . $row["Item_Name"] 
                        . "-" . $row["Price"] 
                        . "-" . $row["id"]
                        . "*";
                }
                
                echo $toReturn;
            }
        }

    }
?>