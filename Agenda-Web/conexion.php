<?php
// establecer la conexión con la base de datos
$conexion = new mysqli("127.0.0.1", "root", "", "contactos_db");

// verificar si hay algún error en la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}
?>