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

// Manejo de eliminación de jugadores
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['eliminar_id'])) {
    $eliminar_id = $connection->real_escape_string($_POST['eliminar_id']);

    // Eliminar el jugador de la base de datos
    $sql = "DELETE FROM jugadores WHERE id = $eliminar_id";

    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Jugador eliminado con éxito</p>";
    } else {
        echo "<p class='error'>Error al eliminar jugador: " . $connection->error . "</p>";
    }

    // Redirigir para evitar reenvío del formulario
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// manejo para agregar jugadores
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

$sql = "SELECT * FROM jugadores";
$result = $connection->query($sql);
?>

<!-- Formulario HTML -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Jugadores</title>
    <style>
        /* Estilos CSS */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }

        h1, h2 {
            color: #333;
        }
        /* Estilos del formulario */
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
        }

        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0 20px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        input[type="submit"] {
            background-color: #28a745;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #218838;
        }

        /* Estilos de la tabla */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        .success {
            color: #28a745;
            font-weight: bold;
        }
        /*  Estilos de error */
        .error {
            color: #dc3545;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Gestión de Jugadores</h1>
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

        <input type="submit" value="Agregar Jugador">
    </form>

    <h2>Jugadores Registrados</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Dorsal</th>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Acciones</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>"; 
                echo "<td>" . $row["nombre"] . "</td>"; 
                echo "<td>" . $row["edad"] . "</td>";
                echo "<td>" . $row["dorsal"] . "</td>";
                echo "<td>" . $row["posicion"] . "</td>";
                echo "<td>" . $row["equipo"] . "</td>";
                echo "<td>
                        <form method='post' action='' onsubmit='return confirm(\"¿Estás seguro de que deseas eliminar este jugador?\");'>
                            <input type='hidden' name='eliminar_id' value='" . $row["id"] . "'>
                            <input type='submit' value='Eliminar' style='background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer;'>
                        </form>
                      </td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='7'>No hay jugadores registrados</td></tr>";
        }
        ?>
    </table>

    <?php
    $connection->close();
    ?>
</body>
</html>
