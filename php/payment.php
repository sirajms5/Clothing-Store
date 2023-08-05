<?php
    include "conn.php";

    if (isset($conn)) {
        try {
            $userId = intval(getData('user_id'));
            $payment = floatval(getData('payment'));
            $queryPayment = "INSERT INTO SIRAJ_STORE_TRANSACTIONS(Amount_Paid, User_Id) VALUES($payment, $userId);";
            $resultPayment = mysqli_query($conn, $queryPayment);
            if($resultPayment){
                $queryUpdateUserCart = "UPDATE SIRAJ_STORE_CARTS SET End_Date = NOW(), Transaction_Id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS) WHERE User_Id = $userId AND End_Date IS NULL;";
                $resultUpdateUserCart = mysqli_query($conn, $queryUpdateUserCart);
                if($resultUpdateUserCart){
                    $queryGetReceipt = "SELECT SIRAJ_STORE_ITEMS.Item_Name,
                                            SIRAJ_STORE_ITEMS.Price,
                                            SIRAJ_STORE_TRANSACTIONS.id
                                        FROM SIRAJ_STORE_ITEMS
                                        JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_ITEMS.id = SIRAJ_STORE_CARTS.Item_Id
                                        JOIN SIRAJ_STORE_TRANSACTIONS ON SIRAJ_STORE_CARTS.Transaction_Id = SIRAJ_STORE_TRANSACTIONS.id
                                        WHERE SIRAJ_STORE_TRANSACTIONS.id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS WHERE User_Id = $userId);";
                    $resultGetReceipt = mysqli_query($conn, $queryGetReceipt);
                    if(mysqli_num_rows($resultGetReceipt) > 0){ 
                        $data = mysqli_fetch_all($resultGetReceipt, MYSQLI_ASSOC);                                  
                        echo json_encode($data);
                    } else {
                        echo json_encode(array("empty" => "cart is empty, user should be able to pay"));
                    }
                }

            }

        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in payment.php: " . $exception->getMessage()));
            error_log("Error in payment.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
        
        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "no connection to database from payment.php"));
    }  

?>