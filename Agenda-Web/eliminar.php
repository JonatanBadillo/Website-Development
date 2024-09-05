<?php
// verificar si se ha enviado el id y el nombre 
if (!empty($_GET["id"]) and !empty($_GET["nombre"])) {
    $id = $_GET["id"];
    $nombre = $_GET["nombre"];

    // elimina el archivo con el nombre especificado
    try {
        unlink($nombre);
    } catch (\Throwable $th) {
        echo "Error al eliminar el registro: " . $th->getMessage();
    }

    // elimina el registro de la base de datos
    $eliminar = $conexion->query("DELETE FROM contactos WHERE id=$id");
    if ($eliminar) {
        echo "<div class='alert alert-success'>Registro eliminado correctamente.</div>";
    } else {
        echo "<div class='alert alert-danger'>Error al eliminar el registro.</div>";
    }
    ?>

    <script>
        // actualizar la URL sin agregar una nueva entrada en el historial del navegador
        history.replaceState(null, null, location.pathname);
    </script>
<?php
}
