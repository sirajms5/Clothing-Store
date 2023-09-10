<?php

    include 'conn.php';

    if (isset($conn)) {
        try {
            $firstName = trim(getData('first-name'));
            $lastName = trim(getData('last-name'));
            $address = trim(getData('address'));
            $dateOfBirth = getData('date-of-birth');
            $email = trim(getData('email'));
            $password = getData('password');

            $queryCheckEmail = "SELECT Email FROM SIRAJ_STORE_USERS WHERE email = ?;";
            $stmtCheckEmail = mysqli_prepare($conn, $queryCheckEmail);

            if ($stmtCheckEmail) {
                mysqli_stmt_bind_param($stmtCheckEmail, "s", $email);
                mysqli_stmt_execute($stmtCheckEmail);
                $resultCheckEmail = mysqli_stmt_get_result($stmtCheckEmail);
                if (mysqli_num_rows($resultCheckEmail) == 0) {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $queryRegistration = "INSERT INTO SIRAJ_STORE_USERS (
                        First_Name,
                        Last_Name,
                        Address,
                        Date_Of_Birth,
                        Email,
                        Password
                    ) VALUES (?, ?, ?, ?, ?, ?);";
                    $stmtRegistration = mysqli_prepare($conn, $queryRegistration);
                    if ($stmtRegistration) {
                        mysqli_stmt_bind_param($stmtRegistration, "ssssss", $firstName, $lastName, $address, $dateOfBirth, $email, $hashedPassword);
                        mysqli_stmt_execute($stmtRegistration);
                        if (mysqli_stmt_affected_rows($stmtRegistration) > 0) {
                            // query to select the new user's ID
                            $querySelectNewId = "SELECT id FROM SIRAJ_STORE_USERS WHERE email = ?;";
                            $stmtSelectNewId = mysqli_prepare($conn, $querySelectNewId);
                            if ($stmtSelectNewId) {
                                mysqli_stmt_bind_param($stmtSelectNewId, "s", $email);
                                mysqli_stmt_execute($stmtSelectNewId);
                                $resultSelectNewId = mysqli_stmt_get_result($stmtSelectNewId);
                                $data = mysqli_fetch_assoc($resultSelectNewId);
                                echo $data['id'];
                            }

                            mysqli_stmt_close($stmtSelectNewId);
                        }

                    }

                    mysqli_stmt_close($stmtRegistration);
                } else {
                    echo "email already registered";
                }

                mysqli_stmt_close($stmtCheckEmail);
            }

        } catch (Exception $exception) {
            echo "Error in registration.php: " . $exception->getMessage();
            error_log("Error in registration.php: " . $exception->getMessage() . "\n", 3, "../errors-log/errors-log.log");
        }

        mysqli_close($conn);
    } else {
        echo "no connection to database from registration.php";
    }

?>
