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



// manejo de eliminación de jugadores
// verificar si se ha enviado el formulario de eliminación y si se ha enviado el ID del jugador a eliminar
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['eliminar_id'])) {
    $eliminar_id = $connection->real_escape_string($_POST['eliminar_id']);
    // eliminar el jugador de la base de datos
    $sql = "DELETE FROM jugadores WHERE id = $eliminar_id";
    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Jugador eliminado con éxito</p>";
    } else {
        echo "<p class='error'>Error al eliminar jugador: " . $connection->error . "</p>";
    }

    // redirigir a la misma página para evitar el reenvío del formulario
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// manejo para agregar jugadores
// verificar si se ha enviado el formulario de agregar jugadores y si los campos no están vacíos
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['nombre']) && !empty($_POST['edad']) && !empty($_POST['dorsal']) && !empty($_POST['posicion']) && !empty($_POST['equipo'])) {
    $nombre = $connection->real_escape_string($_POST['nombre']);
    $edad = $connection->real_escape_string($_POST['edad']);
    $dorsal = $connection->real_escape_string($_POST['dorsal']);
    $posicion = $connection->real_escape_string($_POST['posicion']);
    $equipo = $connection->real_escape_string($_POST['equipo']);

    // insertar el nuevo jugador en la base de datos
    $sql = "INSERT INTO jugadores (nombre, edad, dorsal, posicion, equipo)
            VALUES ('$nombre', $edad, $dorsal, '$posicion', '$equipo')";

    // verificar si la consulta se ha ejecutado correctamente
    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Nuevo jugador agregado con éxito</p>";
    } else {
        echo "<p class='error'>Error: " . $sql . "<br>" . $connection->error . "</p>";
    }

    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// obtener todos los jugadores de la base de datos
$sql = "SELECT * FROM jugadores";
$result = $connection->query($sql);
?>

<!-- formulario HTML -->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Jugadores</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }

        h1,
        h2 {
            color: #333;
        }

        /* estilos del formulario */
        .formulario {
            background-color: #fff;
            padding: 50px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin:auto;

        }
        

        label {
            font-weight: bold;
            padding: auto;
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

        /* estilos de la tabla */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table,
        th,
        td {
            border: 1px solid #ddd;
        }

        th,
        td {
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

        /*  estilos de error */
        .error {
            color: #dc3545;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <h1 >Gestión de Jugadores:</h1>

    <!-- formulario para agregar jugadores -->
    <form method="post" action="" class="formulario">
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

    <!-- tabla para mostrar jugadores registrados -->
    <h2>Jugadores Registrados</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Dorsal</th>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Eliminar?</th>
        </tr>

        <?php
        // mostrar jugadores en la tabla
        // verificar si hay jugadores registrados
        if ($result->num_rows > 0) {
            // mostrar jugadores en la tabla ,si hay jugadores registrados
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["nombre"] . "</td>";
                echo "<td>" . $row["edad"] . "</td>";
                echo "<td>" . $row["dorsal"] . "</td>";
                echo "<td>" . $row["posicion"] . "</td>";
                echo "<td>" . $row["equipo"] . "</td>";
                // botón para eliminar jugador
                echo "<td> 
                        <form method='post' action='' onsubmit='return confirm(\"¿Estás seguro de que deseas eliminar este jugador?\");'> 
                            <input type='hidden' name='eliminar_id' value='" . $row["id"] . "'>
                            <input type='submit' value='Eliminar' style='background-color: #dc3545;  border: none;  cursor: pointer;'>
                        </form>
                      </td>";
                echo "</tr>";
            }
        } else {
            // no hay jugadores en nuestra db
            echo "<tr><td colspan='7'>No hay jugadores registrados</td></tr>";
        }
        ?>
    </table>

    <?php
    // cerramos conexion
    $connection->close();
    ?>
</body>

</html>