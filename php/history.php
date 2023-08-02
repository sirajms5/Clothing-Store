<?php
    include "conn.php";

    if (isset($conn)) {
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
                                    WHERE SIRAJ_STORE_USERS.id = $userId AND SIRAJ_STORE_CARTS.End_Date IS NOT NULL;";

        $resultPreviousPurchases = mysqli_query($conn, $queryPreviousPurchases);
        $data = mysqli_fetch_all($resultPreviousPurchases, MYSQLI_ASSOC);
        mysqli_close($conn);
        if($data){        

            echo json_encode($data);
        } else {

            echo json_encode(array("empty" => "no purchases"));
        }

    }
    
?>