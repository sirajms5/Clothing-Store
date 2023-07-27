<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);
    $payment = floatval($_POST['payment']);

    $queryPayment = "INSERT INTO SIRAJ_STORE_TRANSACTIONS(Amount_Paid, User_Id) VALUES($payment, $userId);";
    $resultPayment = mysqli_query($conn, $queryPayment);

    if($resultPayment){
        $queryUpdateUserCart = "UPDATE SIRAJ_STORE_CARTS SET End_Date = NOW(), Transaction_Id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS) WHERE User_Id = $userId AND End_Date IS NULL;";
        $resultUpdateUserCart = mysqli_query($conn, $queryUpdateUserCart);
        if($resultUpdateUserCart){
            $queryGetReceipt = "SELECT SIRAJ_STORE_ITEMS.Item_Name, SIRAJ_STORE_ITEMS.Price, SIRAJ_STORE_TRANSACTIONS.id
                                FROM SIRAJ_STORE_ITEMS
                                JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_ITEMS.id = SIRAJ_STORE_CARTS.Item_Id
                                JOIN SIRAJ_STORE_TRANSACTIONS ON SIRAJ_STORE_CARTS.Transaction_Id = SIRAJ_STORE_TRANSACTIONS.id
                                WHERE SIRAJ_STORE_TRANSACTIONS.id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS WHERE User_Id = $userId);";

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