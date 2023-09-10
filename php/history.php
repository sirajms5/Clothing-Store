<?php

    include "conn.php";

    if (isset($conn)) {
        try {
            $userId = intval(getData('user_id'));
            $queryPreviousPurchases = "SELECT SIRAJ_STORE_ITEMS.Item_Name,
                                        SIRAJ_STORE_ITEMS.Price,
                                        SIRAJ_STORE_ITEMS.Image_Pathway,
                                        SIRAJ_STORE_ITEMS.Alt_Text,
                                        SIRAJ_STORE_CARTS.Transaction_Id,
                                        SIRAJ_STORE_TRANSACTIONS.Amount_Paid
                                        FROM SIRAJ_STORE_ITEMS
                                        JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_CARTS.Item_Id = SIRAJ_STORE_ITEMS.id
                                        JOIN SIRAJ_STORE_TRANSACTIONS ON SIRAJ_STORE_CARTS.Transaction_Id = SIRAJ_STORE_TRANSACTIONS.id
                                        JOIN SIRAJ_STORE_USERS ON SIRAJ_STORE_USERS.id = SIRAJ_STORE_TRANSACTIONS.User_Id
                                        WHERE SIRAJ_STORE_USERS.id = ? AND SIRAJ_STORE_CARTS.End_Date IS NOT NULL;";
            $stmtPreviousPurchases = mysqli_prepare($conn, $queryPreviousPurchases);        
            if ($stmtPreviousPurchases) {
                mysqli_stmt_bind_param($stmtPreviousPurchases, "i", $userId);
                mysqli_stmt_execute($stmtPreviousPurchases);
                $resultPreviousPurchases = mysqli_stmt_get_result($stmtPreviousPurchases);            
                if (mysqli_num_rows($resultPreviousPurchases) > 0) {
                    $data = mysqli_fetch_all($resultPreviousPurchases, MYSQLI_ASSOC);
                    echo json_encode($data);
                } else {
                    echo json_encode(array("empty" => "no purchases"));
                }
            
                mysqli_stmt_close($stmtPreviousPurchases);
            }

        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in history.php: " . $exception->getMessage()));
            error_log("Error in history.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }
    
        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "no connection to database"));
    }

?>
