<?php
// Mostrar errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "my_db";

// Crear conexión
$conection = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conection->connect_error) {
    die("Conexión fallida: " . $conection->connect_error);
}
echo "¡Conexión exitosa a la base de datos!<br>";

// Manejar la inserción de datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $dorsal = $_POST['dorsal'];
    $posicion = $_POST['posicion'];
    $equipo = $_POST['equipo'];

    $sql = "INSERT INTO jugadores (nombre, edad, dorsal, posicion, equipo, nacionalidad) 
            VALUES ('$nombre', $edad, $dorsal, '$posicion', '$equipo', '$nacionalidad')";

    if ($conn->query($sql) === TRUE) {
        echo "Nuevo jugador agregado con éxito<br>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Mostrar los datos almacenados
$sql = "SELECT * FROM jugadores";
$result = $conection->query($sql);


?>




<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Jugadores</title>
</head>
<body>
    <h1>Agregar Nuevo Jugador</h1>
    <form method="post" action="">
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre" required><br><br>

        <label for="edad">Edad:</label><br>
        <input type="number" id="edad" name="edad" required><br><br>

        <label for="dorsal">Dorsal:</label><br>
        <input type="number" id="dorsal" name="dorsal" required><br><br>

        <label for="posicion">Posición:</label><br>
        <input type="text" id="posicion" name="posicion" required><br><br>

        <label for="equipo">Equipo:</label><br>
        <input type="text" id="equipo" name="equipo" required><br><br>

        <label for="nacionalidad">Nacionalidad:</label><br>
        <input type="text" id="nacionalidad" name="nacionalidad" required><br><br>

        <input type="submit" value="Agregar Jugador">
    </form>

    <h2>Jugadores Registrados</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Dorsal</th>
            <th>Posición</th>
            <th>Equipo</th>

        </tr>
        <?php
        if ($result->num_rows > 0) {
            // Salida de los datos de cada fila
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["nombre"] . "</td>";
                echo "<td>" . $row["edad"] . "</td>";
                echo "<td>" . $row["dorsal"] . "</td>";
                echo "<td>" . $row["posicion"] . "</td>";
                echo "<td>" . $row["equipo"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='7'>No hay jugadores registrados</td></tr>";
        }
        ?>
    </table>

    <?php
    /// Cerrar la conexión
    $conection->close();
    ?>
</body>
</html>
