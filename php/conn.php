<?php
    $serverName = "localhost";
    $databaseName = "siraj_store";
    $userName = "root";
    $password = "";
    $conn = mysqli_connect($serverName,$userName,$password,$databaseName);

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