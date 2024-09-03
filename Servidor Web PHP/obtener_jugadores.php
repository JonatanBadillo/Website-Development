<?php
// SQL para seleccionar todos los jugadores
$sql = "SELECT * FROM jugadores";

// ejecutar consulta y guardar el resultado en la variable $result
$result = $connection->query($sql);
?>