<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        body {
            background-color: #f8f9fa;
            /* Fondo gris claro */
        }

        .table-responsive {
            background-color: white;
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
        }

        .btn-primary {
            background-color: #007bff;
            border: none;
            font-size: 1.25rem;
            padding: 10px 20px;
            border-radius: 30%;
            text-size-adjust: 100%;
            font-size: 1.2rem;
        }


        .modal-content {
            border-radius: 15px;
            padding: 20px;
        }

        .form-label {
            font-weight: 600;
        }

        .table img {
            border-radius: 50%;
            object-fit: cover;
        }

        .table th,
        .table td {
            vertical-align: middle;
            text-align: center;
        }

        /* Ajustes para pantallas pequeñas */
        @media (max-width: 576px) {
            h1 {
                font-size: 2rem;
            }

            .btn-primary,
            .btn-success {
                font-size: 1rem;
                padding: 8px 16px;
            }
        }
    </style>
</head>

<body>
    <h1 class="text-center text-secondary font-weight-bold p-4">Agenda Web</h1>
    <?php
    require "conexion.php";
    require "registrar.php";
    require "editar.php";
    require "eliminar.php";
    $sql = $conexion->query("SELECT * FROM contactos");
    ?>

    <script>
        function eliminar() {
            var respuesta = confirm("¿Estás seguro de eliminar este registro?");
            if (respuesta) {
                return true;
            } else {
                return false;
            }
        }
    </script>

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
                $i = 0;
                while ($datos = $sql->fetch_object()) {
                    $i++;
                    ?>
                    <tr>

                        <th scope="row"><?php echo $i; ?></th>
                        
                        <td>
                            <img width="70" height="70" border="1" style="border-radius: 50%;"
                                src="<?php echo $datos->foto; ?>" alt="Imagen">
                        </td>
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
                            <a class="btn btn-warning" data-bs-toggle="modal"
                                data-bs-target="#exampleModalEditar<?= $datos->id ?>">Editar</a>
                            <a href="index.php?id=<?= $datos->id ?>&nombre=<?= $datos->foto ?>" class="btn btn-danger"
                                onclick="return eliminar()">Eliminar</a>
                        </td>
                    </tr>
                    <!-- Modal Editar-->
                    <div class="modal fade" id="exampleModalEditar<?= $datos->id ?>" tabindex="-1"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar Registro</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" enctype="multipart/form-data" method="post">
                                        <input type="hidden" value="<?= $datos->id ?>" name="id">
                                        <div class="mb-3">
                                            <label for="nombre" class="form-label">Nombre</label>
                                            <input type="text" class="form-control" id="nombre" name="nombre"
                                                placeholder="Ingrese su nombre" value="<?= $datos->nombre ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="apellido" class="form-label">Apellido</label>
                                            <input type="text" class="form-control" id="apellido" name="apellido"
                                                placeholder="Ingrese su apellido" value="<?= $datos->apellido ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="direccion" class="form-label">Dirección</label>
                                            <input type="text" class="form-control" id="direccion" name="direccion"
                                                placeholder="Ingrese su dirección" value="<?= $datos->direccion ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="cp" class="form-label">CP</label>
                                            <input type="text" class="form-control" id="cp" name="cp"
                                                placeholder="Ingrese su código postal" value="<?= $datos->cp ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="telefono" class="form-label">Teléfono</label>
                                            <input type="text" class="form-control" id="telefono" name="telefono"
                                                placeholder="Ingrese su número de teléfono" value="<?= $datos->telefono ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="ciudad" class="form-label">Ciudad</label>
                                            <input type="text" class="form-control" id="ciudad" name="ciudad"
                                                placeholder="Ingrese su ciudad" value="<?= $datos->ciudad ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="pais" class="form-label">País</label>
                                            <input type="text" class="form-control" id="pais" name="pais"
                                                placeholder="Ingrese su país" value="<?= $datos->pais ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" name="email"
                                                placeholder="Ingrese su correo electrónico" value="<?= $datos->email ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
                                            <input type="date" class="form-control" id="fecha_nacimiento"
                                                name="fecha_nacimiento" value="<?= $datos->fecha ?>">
                                        </div>
                                        <div class="mb-3">
                                            <label for="photo" class="form-label">Foto</label>
                                            <input type="file" class="form-control" name="imagen"
                                                value="<?= $datos->foto ?>">
                                        </div>
                                        <input type="hidden" value="<?= $datos->foto ?>" name="nombre_foto">
                                        <input type="submit" class="form-control btn btn-success mb-12" value="Modificar"
                                            name="btneditar">
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

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