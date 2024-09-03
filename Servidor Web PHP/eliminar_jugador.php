<?php
// verificar si la solicitud es post y si presiono el boton de eliminar
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['eliminar_id'])) {
    // obtener el valor del ID del jugador a eliminar con la función real_escape_string que es para evitar inyección de SQL (seguridad)
    $eliminar_id = $connection->real_escape_string($_POST['eliminar_id']);
    
    // crear la consulta SQL para eliminar el jugador con el ID especificado
    $sql = "DELETE FROM jugadores WHERE id = $eliminar_id";
    
    // ejecutar la consulta y verificar si se realizó correctamente
    if ($connection->query($sql) === TRUE) {
        echo "<p class='success'>Jugador eliminado con éxito</p>";
    } else {
        echo "<p class='error'>Error al eliminar jugador: " . $connection->error . "</p>";
    }
    
    // redirigir al mismo archivo para evitar reenvío del formulario al actualizar la página
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>