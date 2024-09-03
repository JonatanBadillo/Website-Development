<?php
// verificar si la solicitud es de tipo POST y si los campos  no están vacíos
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['nombre']) && !empty($_POST['edad']) && !empty($_POST['dorsal']) && !empty($_POST['posicion']) && !empty($_POST['equipo'])) {
    // Escapa los valores de los campos para evitar inyección de SQL
    $nombre = $connection->real_escape_string($_POST['nombre']);
    $edad = $connection->real_escape_string($_POST['edad']);
    $dorsal = $connection->real_escape_string($_POST['dorsal']);
    $posicion = $connection->real_escape_string($_POST['posicion']);
    $equipo = $connection->real_escape_string($_POST['equipo']);

    // crear SQL para insertar un nuevo jugador en la tabla jugadores
    $sql = "INSERT INTO jugadores (nombre, edad, dorsal, posicion, equipo)
            VALUES ('$nombre', $edad, $dorsal, '$posicion', '$equipo')";

    // ejecutar la consulta SQL y verifica si se realizó correctamente
    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Nuevo jugador agregado con éxito</p>";
    } else {
        echo "<p class='error'>Error: " . $sql . "<br>" . $connection->error . "</p>";
    }

    // redirecciona a la misma página para evitar el reenvío del formulario al actualizar la página
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>