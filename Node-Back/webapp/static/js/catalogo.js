// Variables globales para controlar el estado de edición
let editando = false;
let videojuegoIdActual = null;

// Ejecutar el código una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para agregar/editar el videojuego cuando se hace clic en "Guardar"
    const guardarButton = document.getElementById('guardarVideojuego');
    if (guardarButton) {
        guardarButton.onclick = () => {
            if (editando) {
                editarVideojuego();
            } else {
                agregarVideojuego();
            }
        };
    }

    // Llamar a la función para cargar los videojuegos
    cargarVideojuegos();
});

// Función para crear las cartas de videojuegos
function crearCartas(videojuegos) {
    const contenedorCartas = document.getElementById('cartasVideojuegos');
    contenedorCartas.innerHTML = ''; // Limpiar el contenido previo

    // Mostrar un mensaje si no hay videojuegos disponibles
    if (!videojuegos || videojuegos.length === 0) {
        contenedorCartas.innerHTML = '<p>No hay videojuegos disponibles.</p>';
        return;
    }

    // Crear una carta para cada videojuego
    videojuegos.forEach(videojuego => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100';

        const img = document.createElement('img');
        img.src = videojuego.imagen;
        img.className = 'card-img-top';
        img.alt = videojuego.nombre;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = videojuego.nombre;

        const description = document.createElement('p');
        description.className = 'card-text';
        let consolasTexto = Array.isArray(videojuego.consola) ? videojuego.consola.join(', ') : videojuego.consola;
        description.innerHTML = `<p><b>Descripción:</b> ${videojuego.descripcion}</p>
                                 <p><b>Consola:</b> ${consolasTexto}</p>
                                 <p><b>Precio:</b> $${videojuego.precio}</p>`;

        cardBody.appendChild(title);
        cardBody.appendChild(description);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';

        // Botón "Editar"
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning';
        editButton.textContent = 'Editar';
        editButton.onclick = () => prepararEdicion(videojuego); // Llamar a la función de edición

        // Botón "Eliminar"
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger ms-2'; // Agregar margen izquierdo
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarVideojuego(videojuego.id); // Llamar a la función de eliminación

        cardFooter.appendChild(editButton);
        cardFooter.appendChild(deleteButton);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(cardFooter);
        colDiv.appendChild(cardDiv);
        contenedorCartas.appendChild(colDiv);
    });
}

// Función para preparar la edición del videojuego
function prepararEdicion(videojuego) {
    editando = true;
    // Guardar el ID del videojuego actual
    videojuegoIdActual = videojuego.id;

    // Llenar el formulario con los datos del videojuego
    document.getElementById('videojuegoId').value = videojuego.id;
    document.getElementById('nombreVideojuego').value = videojuego.nombre;
    document.getElementById('descripcionVideojuego').value = videojuego.descripcion;
    document.getElementById('precioVideojuego').value = videojuego.precio;

    // Marcar las consolas seleccionadas
    document.getElementById('consolaPlaystation').checked = videojuego.consola.includes('PlayStation');
    document.getElementById('consolaXbox').checked = videojuego.consola.includes('Xbox');
    document.getElementById('consolaNintendo').checked = videojuego.consola.includes('Nintendo Switch');

    // Cambiar el texto del modal
    document.getElementById('videojuegoModalLabel').textContent = 'Editar Videojuego';
    document.getElementById('guardarVideojuego').textContent = 'Guardar Cambios';

    // Mostrar el modal
    new bootstrap.Modal(document.getElementById('videojuegoModal')).show();
}

// Función para agregar un videojuego
function agregarVideojuego() {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombreVideojuego').value.trim();
    const descripcion = document.getElementById('descripcionVideojuego').value.trim();
    const precio = parseFloat(document.getElementById('precioVideojuego').value);
    const imagen = document.getElementById('imagenVideojuego').files[0];

    // Obtener las consolas seleccionadas
    const consolas = [];
    document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
        consolas.push(checkbox.value);
    });

    if (!nombre || !descripcion || isNaN(precio) || consolas.length === 0) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('consolas', JSON.stringify(consolas));
    if (imagen) {
        formData.append('imagen', imagen);
    }

    // Enviar los datos del formulario al servidor mediante una petición POST
    fetch('/api/videojuegos', {
        method: 'POST',
        body: formData,
    })// Promesa que se ejecuta cuando la petición se completa
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el videojuego.');
            }
            return response.json();
        })// Promesa que se ejecuta cuando se obtiene la respuesta del servidor
        .then(data => {
            crearCartas(data);
            alert('Videojuego agregado correctamente.');
            document.getElementById('videojuegoForm').reset();
        })// Promesa que se ejecuta si ocurre un error en la petición
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al agregar el videojuego.');
        });
}

// Función para editar el videojuego
function editarVideojuego() {
    const id = videojuegoIdActual;
    const nombre = document.getElementById('nombreVideojuego').value.trim();
    const descripcion = document.getElementById('descripcionVideojuego').value.trim();
    const precio = parseFloat(document.getElementById('precioVideojuego').value);
    const imagen = document.getElementById('imagenVideojuego').files[0];  // Obtener la imagen si se seleccionó una nueva

    const consolas = [];
    document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
        consolas.push(checkbox.value);
    });

    if (!validarFormulario()) {
        return;  // Si el formulario no es válido, no se envía
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('consolas', JSON.stringify(consolas));

    // Solo agregamos la imagen si se seleccionó una nueva
    if (imagen) {
        formData.append('imagen', imagen);
    }

    // Enviar los datos del formulario al servidor mediante una petición PUT
    fetch('/api/videojuegos', {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al editar el videojuego.');
        }
        return response.json();
    })
    .then(data => {
        crearCartas(data);
        alert('Videojuego editado correctamente.');
        document.getElementById('videojuegoForm').reset();
        editando = false;
        videojuegoIdActual = null;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al editar el videojuego.');
    });
}


// Función para cargar los datos de videojuegos desde el servidor
function cargarVideojuegos() {
    console.log('Iniciando la carga de videojuegos...');

    // Realizar una petición GET al servidor para obtener los videojuegos 
    fetch('/api/videojuegos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de videojuegos.');
            }
            return response.json();
        }) // Promesa que se ejecuta cuando se obtiene la respuesta del servidor
        .then(data => {
            console.log('Datos recibidos del servidor:', data);
            crearCartas(data);
        })// Promesa que se ejecuta si ocurre un error en la petición
        .catch(error => {
            console.error('Error al cargar los datos de videojuegos:', error);
            const contenedorCartas = document.getElementById('cartasVideojuegos');
            contenedorCartas.innerHTML = '<p>Error al cargar los videojuegos.</p>';
        });
}

// Función para eliminar un videojuego
function eliminarVideojuego(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este videojuego?')) {
        return; // Cancelar la eliminación si el usuario no confirma
    }

    // Realizar una petición DELETE al servidor para eliminar el videojuego
    fetch(`/api/videojuegos/${id}`, {
        method: 'DELETE',
    }) // Promesa que se ejecuta cuando la petición se completa
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el videojuego.');
        }
        return response.json();
    }) // Promesa que se ejecuta cuando se obtiene la respuesta del servidor
    .then(data => {
        crearCartas(data); // Actualizar la lista de videojuegos después de la eliminación
        alert('Videojuego eliminado correctamente.');
    }) // Promesa que se ejecuta si ocurre un error en la petición
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al eliminar el videojuego.');
    });
}


// Función para mostrar mensajes de error en los campos del formulario
function mostrarError(campo, mensaje) {
    const errorDiv = document.getElementById(`error-${campo}`);
    if (errorDiv) {
        errorDiv.innerHTML = mensaje;
        errorDiv.style.display = 'block';
    }
}

// Función para limpiar los mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => {
        error.innerHTML = '';
        error.style.display = 'none';
    });
}

// Función para validar datos del formulario antes de enviarlo
function validarFormulario() {
    limpiarErrores();  // Limpiar mensajes anteriores

    const nombre = document.getElementById('nombreVideojuego').value.trim();
    const descripcion = document.getElementById('descripcionVideojuego').value.trim();
    const precio = parseFloat(document.getElementById('precioVideojuego').value);
    const consolasSeleccionadas = document.querySelectorAll('#videojuegoForm .form-check-input:checked');
    const imagen = document.getElementById('imagenVideojuego').files[0];  // Obtener la imagen seleccionada (si hay)

    let esValido = true;

    if (!nombre || nombre.length < 3) {
        mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
        esValido = false;
    }

    if (!descripcion) {
        mostrarError('descripcion', 'La descripción es obligatoria.');
        esValido = false;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarError('precio', 'El precio debe ser un número válido y mayor que 0.');
        esValido = false;
    }

    if (consolasSeleccionadas.length === 0) {
        mostrarError('consolas', 'Debes seleccionar al menos una consola.');
        esValido = false;
    }

    // Validar imagen solo si NO estamos editando (es decir, si estamos agregando)
    if (!editando && !imagen) {
        mostrarError('imagen', 'Debes seleccionar una imagen para el videojuego.');
        esValido = false;
    }

    return esValido;
}



// Asignar la función al evento de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const guardarButton = document.getElementById('guardarVideojuego');
    if (guardarButton) {
        guardarButton.onclick = () => {
            if (validarFormulario()) {
                if (editando) {
                    editarVideojuego();
                } else {
                    agregarVideojuego();
                }
            }
        };
    }

    cargarVideojuegos();
});
