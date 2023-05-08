<?php

    include "config.ini.php";

    if(isset($_POST['voegtoe_firstname']) && isset($_POST['voegtoe_lastname']) && isset($_POST['voegtoe_tel'])){

        $voegtoe_firstname = htmlentities($_POST['voegtoe_firstname']);
        $voegtoe_lastname = htmlentities($_POST['voegtoe_lastname']);
        $voegtoe_tel = htmlentities($_POST['voegtoe_tel']);
        
        $query = "INSERT INTO `spa_klant`(`klant_naam`, `klant_achternaam`, `klant_tel`) VALUES ('$voegtoe_firstname','$voegtoe_lastname','$voegtoe_tel')";
        
        $result = mysqli_query($connect, $query);

        if($result){
            echo "Klant met naam $voegtoe_firstname $voegtoe_lastname is aangemaakt!";
        }else{
            echo "Er is een fout opgetreden probeer later nogmaals";
        }
    }


    mysqli_close($connect);
