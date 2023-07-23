<?php
    include "conn.php";

    $userId = intval($_POST['user_id']);
    $payment = floatval($_POST['payment']);

    $queryPayment = "INSERT INTO transactions(Amount_Paid, User_Id) VALUES($payment, $userId);";
    $resultPayment = mysqli_query($conn, $queryPayment);

    if($resultPayment){
        $querryUpdateUserCart = "UPDATE carts SET End_Date = NOW() WHERE User_Id = $userId AND End_Date IS NULL;";
        $resultUpdateUserCart = mysqli_query($conn, $querryUpdateUserCart);
        if($resultUpdateUserCart){
            echo "paid";
        }

    }
?>