<?php

    include "config.ini.php";

    if(isset($_POST['customer_id']) && isset($_POST['inputDatetime']) && isset($_POST['inputBehandeling']) && isset($_POST['bezoek_id'])){

        $customer_id = htmlentities($_POST['customer_id']);
        $inputDatetime = htmlentities($_POST['inputDatetime']);
        $inputBehandeling = htmlentities($_POST['inputBehandeling']);
        $bezoek_id = htmlentities($_POST['bezoek_id']);

        $query = "UPDATE `spa_bezoek` SET `bezoek_behandeling`='$inputBehandeling',`bezoek_tijd`='$inputDatetime' WHERE `bezoek_id` = $bezoek_id AND `klant_id` = $customer_id";
        
        $result = mysqli_query($connect, $query);

        if($result){
            echo "Behandeling is aangepast!";
        }else{
            echo "Er is een fout opgetreden probeer later nogmaals";
        }
    }

    mysqli_close($connect);
