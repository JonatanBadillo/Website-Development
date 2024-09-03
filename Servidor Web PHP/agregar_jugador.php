<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['nombre']) && !empty($_POST['edad']) && !empty($_POST['dorsal']) && !empty($_POST['posicion']) && !empty($_POST['equipo'])) {
    $nombre = $connection->real_escape_string($_POST['nombre']);
    $edad = $connection->real_escape_string($_POST['edad']);
    $dorsal = $connection->real_escape_string($_POST['dorsal']);
    $posicion = $connection->real_escape_string($_POST['posicion']);
    $equipo = $connection->real_escape_string($_POST['equipo']);

    $sql = "INSERT INTO jugadores (nombre, edad, dorsal, posicion, equipo)
            VALUES ('$nombre', $edad, $dorsal, '$posicion', '$equipo')";

    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Nuevo jugador agregado con éxito</p>";
    } else {
        echo "<p class='error'>Error: " . $sql . "<br>" . $connection->error . "</p>";
    }
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>