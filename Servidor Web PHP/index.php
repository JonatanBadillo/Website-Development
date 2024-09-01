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
    $nacionalidad = $_POST['nacionalidad'];

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
// Cerrar la conexión
$conection->close();
?>
