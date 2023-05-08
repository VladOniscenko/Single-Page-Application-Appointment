<?php

    include "config.ini.php";
    
    $query = "SELECT * FROM spa_klant";
    $result = mysqli_query($connect, $query);

    $customerData = [];
        
    while($row = mysqli_fetch_assoc($result)){
        $customerData[] = $row;
    }

    echo json_encode($customerData);

    mysqli_close($connect);