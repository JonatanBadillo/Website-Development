<?php
if (!empty($_GET["id"]) and !empty($_GET["nombre"])) {
    $id = $_GET["id"];
    $nombre = $_GET["nombre"];


    try {
        unlink($nombre);
    } catch (\Throwable $th) {
        echo "Error al eliminar el registro: " . $th->getMessage();

    }

    $eliminar = $conexion->query("DELETE FROM contactos WHERE id=$id");
    if ($eliminar) {
        echo "<div class='alert alert-success'>Registro eliminado correctamente.</div>";
    } else {
        echo "<div class='alert alert-danger'>Error al eliminar el registro.</div>";
    } ?>

    <script>
        history.replaceState(null, null, location.pathname);
    </script>
<?php
}
