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
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "¡Conexión exitosa a la base de datos!<br>";

// Datos a insertar
$nombre = "Lionel Messi";
$edad = 36;
$dorsal = 10;
$posicion = "Delantero";
$equipo = "Inter Miami";
$nacionalidad = "Argentina";

// Consulta SQL para insertar datos en la tabla
$sql = "INSERT INTO jugadores (nombre, edad, dorsal, posicion, equipo, nacionalidad) 
        VALUES ('$nombre', $edad, $dorsal, '$posicion', '$equipo', '$nacionalidad')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo registro creado con éxito<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

if ($conn->query($sql) === TRUE) {
    echo "Campos agregados a la tabla `jugadores` con éxito<br>";
} else {
    echo "Error al agregar campos: " . $conn->error . "<br>";
}

// Cerrar la conexión
$conn->close();
?>
