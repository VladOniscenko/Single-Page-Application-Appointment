<?php

    include "config.ini.php";

    if(isset($_POST['bewerk_klant_id']) && isset($_POST['bewerk_datetime']) && isset($_POST['bewerk_behandeling']) && isset($_POST['bewerk_behandeling_id'])){

        $customer_id = htmlentities($_POST['bewerk_klant_id']);
        $inputDatetime = htmlentities($_POST['bewerk_datetime']);
        $inputBehandeling = htmlentities($_POST['bewerk_behandeling']);
        $bezoek_id = htmlentities($_POST['bewerk_behandeling_id']);

        $query = "UPDATE `spa_bezoek` SET `bezoek_behandeling`='$inputBehandeling',`bezoek_tijd`='$inputDatetime' WHERE `bezoek_id` = $bezoek_id AND `klant_id` = $customer_id";
        
        $result = mysqli_query($connect, $query);

        if($result){
            echo "Behandeling met ID:$bezoek_id is aangepast!";
        }else{
            echo "Er is een fout opgetreden probeer later nogmaals";
        }
    }

    mysqli_close($connect);
