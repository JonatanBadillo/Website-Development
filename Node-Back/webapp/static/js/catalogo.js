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

    if (!videojuegos || videojuegos.length === 0) {
        contenedorCartas.innerHTML = '<p>No hay videojuegos disponibles.</p>';
        return;
    }

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

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning';
        editButton.textContent = 'Editar';
        editButton.onclick = () => prepararEdicion(videojuego); // Llamar a la función de edición

        cardFooter.appendChild(editButton);
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
    const nombre = document.getElementById('nombreVideojuego').value.trim();
    const descripcion = document.getElementById('descripcionVideojuego').value.trim();
    const precio = parseFloat(document.getElementById('precioVideojuego').value);
    const imagen = document.getElementById('imagenVideojuego').files[0];

    const consolas = [];
    document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
        consolas.push(checkbox.value);
    });

    if (!nombre || !descripcion || isNaN(precio) || consolas.length === 0) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('consolas', JSON.stringify(consolas));
    if (imagen) {
        formData.append('imagen', imagen);
    }

    fetch('/api/videojuegos', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el videojuego.');
            }
            return response.json();
        })
        .then(data => {
            crearCartas(data);
            alert('Videojuego agregado correctamente.');
            document.getElementById('videojuegoForm').reset();
        })
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
  const imagen = document.getElementById('imagenVideojuego').files[0];

  const consolas = [];
  document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
      consolas.push(checkbox.value);
  });

  if (!id || !nombre || !descripcion || isNaN(precio) || consolas.length === 0) {
      alert('Todos los campos son obligatorios.');
      return;
  }

  const formData = new FormData();
  formData.append('id', id);
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio', precio);
  formData.append('consolas', JSON.stringify(consolas));
  if (imagen) {
      formData.append('imagen', imagen);
  }

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

    fetch('/api/videojuegos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de videojuegos.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos del servidor:', data);
            crearCartas(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos de videojuegos:', error);
            const contenedorCartas = document.getElementById('cartasVideojuegos');
            contenedorCartas.innerHTML = '<p>Error al cargar los videojuegos.</p>';
        });
}