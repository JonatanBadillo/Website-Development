<?php
$conexion = new mysqli("127.0.0.1", "root", "", "contactos_db");
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}
?>