<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    $hostname = "localhost";
    $username = "";
    $password = "";
    $database = "";

    $connect = mysqli_connect($hostname, $username, $password, $database);

    if(!$connect){
        echo "can't connect to database";
    }