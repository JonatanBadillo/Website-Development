<?php
if (!empty($_POST["btneditar"])) {

    $id = $_POST["id"];
    $nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : null;
    $apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : null;
    $direccion = isset($_POST["direccion"]) ? $_POST["direccion"] : null;
    $cp = isset($_POST["cp"]) ? $_POST["cp"] : null;
    $telefono = isset($_POST["telefono"]) ? $_POST["telefono"] : null;
    $ciudad = isset($_POST["ciudad"]) ? $_POST["ciudad"] : null;
    $pais = isset($_POST["pais"]) ? $_POST["pais"] : null;
    $email = isset($_POST["email"]) ? $_POST["email"] : null;
    $fecha_nacimiento = isset($_POST["fecha_nacimiento"]) ? $_POST["fecha_nacimiento"] : null;
    $foto_actual = isset($_POST["nombre_foto"]) ? $_POST["nombre_foto"] : null;

    // Verificar si algún campo está vacío
    if (empty($nombre) || empty($apellido) || empty($direccion) || empty($cp) || empty($telefono) || empty($ciudad) || empty($pais) || empty($email) || empty($fecha_nacimiento)) {
        echo "<div class='alert alert-danger'>Por favor, complete todos los campos.</div>";
        exit();
    }

    $imagen = $_FILES["imagen"]["tmp_name"];
    $nombreImagen = $_FILES["imagen"]["name"];
    $tipoImagen = strtolower(pathinfo($nombreImagen, PATHINFO_EXTENSION));
    $directorio = "archivos/";

    if (!empty($nombreImagen)) {
        // Si se seleccionó una nueva imagen
        $ruta = $directorio . $id . "." . $tipoImagen;
        if ($tipoImagen == "jpg" || $tipoImagen == "jpeg" || $tipoImagen == "png") {
            if (move_uploaded_file($imagen, $ruta)) {
                $foto = $ruta; // Nueva foto
            } else {
                echo "<div class='alert alert-danger'>Error al subir la nueva imagen.</div>";
                $foto = $foto_actual; // Mantener la foto actual si hay error
            }
        } else {
            echo "<div class='alert alert-danger'>Formato de imagen no válido.</div>";
            $foto = $foto_actual; // Mantener la foto actual si el formato es incorrecto
        }
    } else {
        // Si no se seleccionó una nueva imagen, mantener la foto actual
        $foto = $foto_actual;
    }

    // Actualización en la base de datos
    $sql = "UPDATE contactos SET nombre='$nombre', apellido='$apellido', direccion='$direccion', cp='$cp', telefono='$telefono', ciudad='$ciudad', pais='$pais', email='$email', fecha='$fecha_nacimiento', foto='$foto' WHERE id=$id";

    if ($conexion->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "<div class='alert alert-danger'>Error al actualizar el contacto: " . $conexion->error . "</div>";
    }
}