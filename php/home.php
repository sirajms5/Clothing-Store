<?php
    include 'conn.php';

    $query = "SELECT * FROM items;";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if($data){
        $toReturn = "";
        foreach($data as $row){
            $toReturn = $toReturn . $row["id"] . "-" . $row["Item_Name"] . "-" . $row["Price"] . "-" . $row["Sex"] . "-" . $row["Category"] . "-" . $row["Image_Pathway"] . "*";
        }
        
        echo $toReturn;
    } else {
        echo "Store is empty";
    }
?>