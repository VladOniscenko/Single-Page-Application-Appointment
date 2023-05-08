<?php

    include "config.ini.php";
    if(isset($_POST['bezoek_id_del']) && isset($_POST['klant_id_del'])){
        $customer_id = htmlentities($_POST['klant_id_del']);
        $bezoek_id = htmlentities($_POST['bezoek_id_del']);
        
        $query = "DELETE FROM `spa_bezoek` WHERE `bezoek_id` = $bezoek_id AND `klant_id` = $customer_id";

        $result = mysqli_query($connect, $query);
    
       if($result){
        echo "Behandeling met ID:$bezoek_id is verwijderd!";
       }else{
        echo "Er is een fout opgetreden probeer later nogmaals";
       }
    }

    mysqli_close($connect);