<?php 
if(!empty($_POST["btnregistrar"])){
    
    // verificar que los campos existen y no están vacíos
    $nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : null;
    $apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : null;
    $direccion = isset($_POST["direccion"]) ? $_POST["direccion"] : null;
    $cp = isset($_POST["cp"]) ? $_POST["cp"] : null;
    $telefono = isset($_POST["telefono"]) ? $_POST["telefono"] : null;
    $ciudad = isset($_POST["ciudad"]) ? $_POST["ciudad"] : null;
    $pais = isset($_POST["pais"]) ? $_POST["pais"] : null;
    $email = isset($_POST["email"]) ? $_POST["email"] : null;
    $fecha_nacimiento = isset($_POST["fecha_nacimiento"]) ? $_POST["fecha_nacimiento"] : null;

    // validar que los campos obligatorios no estén vacíos
    if ($nombre && $apellido && $direccion && is_numeric($cp) && $telefono && $ciudad && $pais && $email && $fecha_nacimiento) {
        $imagen = $_FILES["imagen"]["tmp_name"];
        $nombreImagen = $_FILES["imagen"]["name"];
        $tipoImagen = strtolower(pathinfo($nombreImagen, PATHINFO_EXTENSION));
        $sizeImagen = $_FILES["imagen"]["size"];
        $directorio = "archivos/";

        // verifica que la imagen sea jpg, jpeg o png
        if($tipoImagen == "jpg" || $tipoImagen == "jpeg" || $tipoImagen == "png"){
            // inserta los demás datos antes de la imagen
            $registro = $conexion->query("INSERT INTO contactos (nombre, apellido, direccion, cp, telefono, ciudad, pais, email, fecha, foto) VALUES ('$nombre', '$apellido', '$direccion', '$cp', '$telefono', '$ciudad', '$pais', '$email', '$fecha_nacimiento', '')");

            // verifica que la inserción haya sido exitosa antes de proceder
            if($registro){
                $idRegistro = $conexion->insert_id;

                $ruta = $directorio . $idRegistro . "." . $tipoImagen;
                
                // mover la imagen al directorio deseado
                if (move_uploaded_file($imagen, $ruta)) {
                    // Actualiza el registro con la ruta de la imagen
                    $actualizarImagen = $conexion->query("UPDATE contactos SET foto='$ruta' WHERE id=$idRegistro");

                    if($actualizarImagen){
                        // redirige a la misma página para evitar reenvío del formulario
                        header("Location: " . $_SERVER['PHP_SELF']);
                        exit();
                    } else {
                        echo "<div class='alert alert-danger'>Error al guardar la imagen.</div>";
                    }
                } else {
                    echo "<div class='alert alert-danger'>Error al subir la imagen.</div>";
                }
            } else {
                echo "<div class='alert alert-danger'>Error al guardar los datos del contacto.</div>";
            }
        } else {
            echo "<div class='alert alert-danger'>Formato de imagen no válido</div>";
        }
    } else {
        echo "<div class='alert alert-danger'>Por favor, completa todos los campos obligatorios correctamente.</div>";
    }
}
?>
