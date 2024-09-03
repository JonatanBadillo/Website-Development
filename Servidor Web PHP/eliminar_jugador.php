<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['eliminar_id'])) {
    $eliminar_id = $connection->real_escape_string($_POST['eliminar_id']);
    $sql = "DELETE FROM jugadores WHERE id = $eliminar_id";
    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Jugador eliminado con éxito</p>";
    } else {
        echo "<p class='error'>Error al eliminar jugador: " . $connection->error . "</p>";
    }
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>