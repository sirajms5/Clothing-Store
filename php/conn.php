<?php
    $serverName = "localhost";
    $databaseName = "siraj_store";
    $userName = "root";
    $password = "";
    try{
        $conn = mysqli_connect($serverName,$userName,$password,$databaseName);
    } catch (Exception $exception) {
        error_log("Error in conn.php: " . $exception->getMessage(), 3, "../errors-log/errors-log.log");
    }
    

    function getData($field) {
        if (!isset($_POST[$field])) {
            $data = "";
        }
        else {
            $data = $_POST[$field];
        }

        return $data;
    }
    
?>