<?php

    include "conn.php";

    if (isset($conn)) {
        try {
            $userId = intval(getData('user_id'));
            $payment = floatval(getData('payment'));
            $queryPayment = "INSERT INTO SIRAJ_STORE_TRANSACTIONS(Amount_Paid, User_Id) VALUES (?, ?);";
            $stmtPayment = mysqli_prepare($conn, $queryPayment);
            if ($stmtPayment) {
                mysqli_stmt_bind_param($stmtPayment, "di", $payment, $userId);
                mysqli_stmt_execute($stmtPayment);
                if (mysqli_stmt_affected_rows($stmtPayment) > 0) {
                    // query to update user cart query
                    $queryUpdateUserCart = "UPDATE SIRAJ_STORE_CARTS SET End_Date = NOW(), Transaction_Id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS) WHERE User_Id = ? AND End_Date IS NULL;";
                    $stmtUpdateUserCart = mysqli_prepare($conn, $queryUpdateUserCart);
                    if ($stmtUpdateUserCart) {
                        mysqli_stmt_bind_param($stmtUpdateUserCart, "i", $userId);
                        mysqli_stmt_execute($stmtUpdateUserCart);
                        if (mysqli_stmt_affected_rows($stmtUpdateUserCart) > 0) {
                            // query to get the receipt
                            $queryGetReceipt = "SELECT SIRAJ_STORE_ITEMS.Item_Name,
                                                    SIRAJ_STORE_ITEMS.Price,
                                                    SIRAJ_STORE_TRANSACTIONS.id
                                                FROM SIRAJ_STORE_ITEMS
                                                JOIN SIRAJ_STORE_CARTS ON SIRAJ_STORE_ITEMS.id = SIRAJ_STORE_CARTS.Item_Id
                                                JOIN SIRAJ_STORE_TRANSACTIONS ON SIRAJ_STORE_CARTS.Transaction_Id = SIRAJ_STORE_TRANSACTIONS.id
                                                WHERE SIRAJ_STORE_TRANSACTIONS.id = (SELECT MAX(id) FROM SIRAJ_STORE_TRANSACTIONS WHERE User_Id = ?);";
                            $stmtGetReceipt = mysqli_prepare($conn, $queryGetReceipt);
                            if ($stmtGetReceipt) {
                                mysqli_stmt_bind_param($stmtGetReceipt, "i", $userId);
                                mysqli_stmt_execute($stmtGetReceipt);
                                $resultGetReceipt = mysqli_stmt_get_result($stmtGetReceipt);
                                if (mysqli_num_rows($resultGetReceipt) > 0) {
                                    $data = mysqli_fetch_all($resultGetReceipt, MYSQLI_ASSOC);
                                    echo json_encode($data);
                                } else {
                                    echo json_encode(array("empty" => "cart is empty, user should be able to pay"));
                                }

                                mysqli_stmt_close($stmtGetReceipt);
                            }

                        }
                        
                    }

                    mysqli_stmt_close($stmtUpdateUserCart);
                }

                mysqli_stmt_close($stmtPayment);
            }

        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in payment.php: " . $exception->getMessage()));
            error_log("Error in payment.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "no connection to the database from payment.php"));
    }

?>
