<?php

    include "conn.php";

    if (isset($conn)) {
        try {
            $currentPassword = getData('current_password');
            $newPassword = getData('new_password');
            $userId = intval(getData('user_id'));
            $queryPasswordCheck = "SELECT Password FROM SIRAJ_STORE_USERS WHERE id = ?;";
            $stmtPasswordCheck = mysqli_prepare($conn, $queryPasswordCheck);
            if ($stmtPasswordCheck) {
                mysqli_stmt_bind_param($stmtPasswordCheck, "i", $userId);
                mysqli_stmt_execute($stmtPasswordCheck);
                mysqli_stmt_store_result($stmtPasswordCheck);
                if (mysqli_stmt_num_rows($stmtPasswordCheck) > 0) {
                    mysqli_stmt_bind_result($stmtPasswordCheck, $storedHashedPassword);
                    mysqli_stmt_fetch($stmtPasswordCheck);
                    if (password_verify($currentPassword, $storedHashedPassword)) {
                        // Hashing new password
                        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                        // Updateing password
                        $queryChangePassword = "UPDATE SIRAJ_STORE_USERS SET Password = ? WHERE id = ?;";
                        $stmtChangePassword = mysqli_prepare($conn, $queryChangePassword);
                        if ($stmtChangePassword) {
                            mysqli_stmt_bind_param($stmtChangePassword, "si", $hashedNewPassword, $userId);
                            if (mysqli_stmt_execute($stmtChangePassword)) {
                                echo "success";
                            }
                        
                            mysqli_stmt_close($stmtChangePassword);
                        }
                        
                    } else {
                        echo "wrong password";
                    }

                } else {
                    echo "No user found with the provided ID.";
                }

                mysqli_stmt_close($stmtPasswordCheck);
            }

        } catch (Exception $exception) {
            echo "Error in change-password.php: " . $exception->getMessage();
            error_log("Error in change-password.php: " . $exception->getMessage(), 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);
    } else {
        echo "no connection";
    }

?>
