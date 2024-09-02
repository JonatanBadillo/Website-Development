<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <h1 class="text-center text-secondary font-weight-bold p-4">Agenda Web</h1>
    <?php
    require "conexion.php";
    require "registrar.php";
    $sql = $conexion->query("SELECT * FROM contactos");
    ?>

    <div class="p-3 table-responsive">

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            +
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo Registro</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" enctype="multipart/form-data" method="post">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombre"
                                    placeholder="Ingrese su nombre">
                            </div>
                            <div class="mb-3">
                                <label for="apellido" class="form-label">Apellido</label>
                                <input type="text" class="form-control" id="apellido" name="apellido"
                                    placeholder="Ingrese su apellido">
                            </div>
                            <div class="mb-3">
                                <label for="direccion" class="form-label">Dirección</label>
                                <input type="text" class="form-control" id="direccion" name="direccion"
                                    placeholder="Ingrese su dirección">
                            </div>
                            <div class="mb-3">
                                <label for="cp" class="form-label">CP</label>
                                <input type="text" class="form-control" id="cp" name="cp"
                                    placeholder="Ingrese su código postal">
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Teléfono</label>
                                <input type="text" class="form-control" id="telefono" name="telefono"
                                    placeholder="Ingrese su número de teléfono">
                            </div>
                            <div class="mb-3">
                                <label for="ciudad" class="form-label">Ciudad</label>
                                <input type="text" class="form-control" id="ciudad" name="ciudad"
                                    placeholder="Ingrese su ciudad">
                            </div>
                            <div class="mb-3">
                                <label for="pais" class="form-label">País</label>
                                <input type="text" class="form-control" id="pais" name="pais"
                                    placeholder="Ingrese su país">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email"
                                    placeholder="Ingrese su correo electrónico">
                            </div>
                            <div class="mb-3">
                                <label for="fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control" id="fecha_nacimiento" name="fecha_nacimiento">
                            </div>
                            <div class="mb-3">
                                <label for="photo" class="form-label">Foto</label>
                                <input type="file" class="form-control" name="imagen">
                            </div>
                            <input type="submit" class="form-control btn btn-success mb-12" value="Registrar"
                                name="btnregistrar">
                        </form>

                    </div>

                </div>
            </div>
        </div>

        <!-- Tabla de contactos -->
        <table class="table table-hover table-striped">

            <thead class="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">CP</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">Pais</th>
                    <th scope="col">Email</th>
                    <th scope="col">Fecha de Nacimiento</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
    <?php
    while ($datos = $sql->fetch_object()) {
        ?>
        <tr>
            <th scope="row"><?php echo $datos->id; ?></th>
            <td>
                <img  width="70" height="70"src="<?php echo $datos->foto; ?>" alt="Imagen" width="50">
            </td>
            <td><?php echo $datos->nombre; ?></td>
            <td><?php echo $datos->apellido; ?></td>
            <td><?php echo $datos->direccion; ?></td>
            <td><?php echo $datos->cp; ?></td>
            <td><?php echo $datos->telefono; ?></td>
            <td><?php echo $datos->ciudad; ?></td>
            <td><?php echo $datos->pais; ?></td>
            <td><?php echo $datos->email; ?></td>
            <td><?php echo $datos->fecha; ?></td>
            <td>
                <a href="#" class="btn btn-warning">Editar</a>
                <a href="#" class="btn btn-danger">Eliminar</a>
            </td>
        </tr>
        <?php
    }
    ?>
</tbody>


        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>