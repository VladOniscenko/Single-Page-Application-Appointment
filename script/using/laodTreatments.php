<?php

    include "config.ini.php";

    if(isset($_POST['customer_id'])){

        $klant_id = htmlentities($_POST['customer_id']);

        $query = "SELECT * FROM spa_bezoek WHERE klant_id = $klant_id";
        $result = mysqli_query($connect, $query);
    
        $treatmentData = [];
            
        while($row = mysqli_fetch_assoc($result)){
            $treatmentData[] = $row;
        }

        echo json_encode($treatmentData);
    }
    mysqli_close($connect);
