<?php

    include "conn.php";

    if (isset($conn)) {
        try {
            $userId = getData('user_id');        
            $query = "SELECT First_Name,
                            Last_Name,
                            Address,
                            Date_Of_Birth,
                            Email
                    FROM SIRAJ_STORE_USERS
                    WHERE id = ?;";
            $stmt = mysqli_prepare($conn, $query);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $userId);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if ($result) {
                    $data = mysqli_fetch_assoc($result);
                    echo json_encode($data);
                }
            
                mysqli_stmt_close($stmt);
            }
        
        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in profile.php: " . $exception->getMessage()));
            error_log("Error in profile.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "no connection to database from profile.php"));
    }

?>
