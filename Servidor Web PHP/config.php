<?php
// mostrar errores en pantalla
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// configuración de la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "my_db";

// crear conexión
$connection = new mysqli($servername, $username, $password, $dbname);

// verificar la conexión
if ($connection->connect_error) {
    die("Conexión fallida: " . $connection->connect_error);
}
?>