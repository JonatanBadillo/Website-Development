<?php
include 'config.php'; // conexion a db
include 'eliminar_jugador.php'; // para eliminar jugadores
include 'agregar_jugador.php'; //para agregar jugadores
include 'obtener_jugadores.php'; // para obtener jugadores
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Jugadores</title>
    <style>
        /* Estilos */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
        }
        .formulario {
            background-color: #fff;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin:auto;
        }
        label {
            font-weight: bold;
            padding: auto;
        }
        input[type="text"], input[type="number"] {
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
        .error {
            color: #dc3545;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Gestión de Jugadores:</h1>
    <!-- Formulario para agregar jugadores -->
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
        if ($result->num_rows > 0) { // si hay jugadores registrados en la db
            while ($row = $result->fetch_assoc()) { // itera sobre cada jugador en la db
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>"; // ID del jugador
                echo "<td>" . $row["nombre"] . "</td>"; // nombre del jugador
                echo "<td>" . $row["edad"] . "</td>"; // edad del jugador
                echo "<td>" . $row["dorsal"] . "</td>"; // dorsal del jugador
                echo "<td>" . $row["posicion"] . "</td>"; // posición del jugador
                echo "<td>" . $row["equipo"] . "</td>"; // equipo del jugador
                echo "<td> 
                        <form method='post' action='' onsubmit='return confirm(\"¿Estás seguro de que deseas eliminar este jugador?\");'> 
                            <input type='hidden' name='eliminar_id' value='" . $row["id"] . "'>
                            <input type='submit' value='Eliminar' style='background-color: #dc3545;  border: none;  cursor: pointer;'>
                        </form>
                      </td>"; // muestra un formulario para eliminar el jugador
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='7'>No hay jugadores registrados</td></tr>"; // muestra un mensaje si no hay jugadores registrados
        }
        ?>
    </table>
    <?php $connection->close(); ?> <!-- cerrar la conexión a la db -->
</body>
</html>