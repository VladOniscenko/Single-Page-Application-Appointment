<?php

    include "config.ini.php";
    if(isset($_POST['like'])){
        $like = htmlentities($_POST['like']);
        
        $query = "SELECT *, REPLACE(CONCAT_WS(' ', `klant_naam`, `klant_achternaam`), ' ', ' ') AS customerName FROM `spa_klant` WHERE CONCAT_WS(' ', `klant_naam`, `klant_achternaam`) LIKE '%$like%'";

        $result = mysqli_query($connect, $query);
    
        $customerData = [];
            
        while($row = mysqli_fetch_assoc($result)){
            $customerData[] = $row;
        }
    
        echo json_encode($customerData);
    }

    mysqli_close($connect);