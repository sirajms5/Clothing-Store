<?php

    include 'conn.php';

    if (isset($conn)) {
        try {
            $email = trim(getData('email'));
            $password = getData('password');
            $queryCheckEmail = "SELECT First_Name, Last_Name, id, Password FROM SIRAJ_STORE_USERS WHERE email = ?;";
            $stmtCheckEmail = mysqli_prepare($conn, $queryCheckEmail);
            if ($stmtCheckEmail) {
                mysqli_stmt_bind_param($stmtCheckEmail, "s", $email);
                mysqli_stmt_execute($stmtCheckEmail);
                $resultCheckEmail = mysqli_stmt_get_result($stmtCheckEmail);
                if (mysqli_num_rows($resultCheckEmail) > 0) {
                    $data = mysqli_fetch_assoc($resultCheckEmail);
                    $hashedPassword = $data['Password'];
                    if (password_verify($password, $hashedPassword)) {
                        echo json_encode($data);
                    } else {
                        echo json_encode(array("wrong" => "wrong password"));
                    }
                    
                } else {
                    echo json_encode(array("wrong" => "unregistered email"));
                }

                mysqli_stmt_close($stmtCheckEmail);
            }
        
        } catch (Exception $exception) {
            echo json_encode(array("error" => "Error in login.php: " . $exception->getMessage()));
            error_log("Error in login.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "no connection to database from login.php"));
    }

?>
