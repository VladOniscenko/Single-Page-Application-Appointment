<?php

    include "config.ini.php";

    if(isset($_POST['toevoeg_customer_id']) && isset($_POST['toevoeg_behandeling']) && isset($_POST['toevoeg_datetime'])){

        $customer_id = htmlentities($_POST['toevoeg_customer_id']);
        $inputDatetime = htmlentities($_POST['toevoeg_datetime']);
        $inputBehandeling = htmlentities($_POST['toevoeg_behandeling']);
        
        $query = "INSERT INTO `spa_bezoek`(`bezoek_id`, `bezoek_behandeling`, `bezoek_tijd`, `klant_id`) VALUES (NULL, $inputBehandeling, '$inputDatetime', $customer_id)";
        
        $result = mysqli_query($connect, $query);

        if($result){
            echo "Nieuwe behandeling is toegevoegd";
        }else{
            echo "Er is een fout opgetreden probeer later nogmaals";
        }
    }

    mysqli_close($connect);
