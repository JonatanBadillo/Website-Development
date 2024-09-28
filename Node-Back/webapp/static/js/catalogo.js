// Función para crear las cartas de videojuegos
function crearCartas(videojuegos) {
    const contenedorCartas = document.getElementById('cartasVideojuegos');
    contenedorCartas.innerHTML = ''; // Limpiar el contenido previo
  
    // Verificar si videojuegos tiene elementos
    if (!videojuegos || videojuegos.length === 0) {
      contenedorCartas.innerHTML = '<p>No hay videojuegos disponibles.</p>';
      return;
    }
  
    videojuegos.forEach(videojuego => {
      console.log('Creando tarjeta para:', videojuego.nombre); // Depuración
  
      const colDiv = document.createElement('div');
      colDiv.className = 'col';
  
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card h-100';
  
      const img = document.createElement('img');
      img.src = videojuego.imagen;
      img.className = 'card-img-top';
      img.alt = videojuego.nombre;
  
      // Depuración: Verificar la ruta de la imagen
      console.log('Ruta de la imagen:', img.src);
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = videojuego.nombre;
  
      const description = document.createElement('p');
      description.className = 'card-text';
  
      // Verificar si consola es un arreglo o un string
      let consolasTexto = Array.isArray(videojuego.consola) ? videojuego.consola.join(', ') : videojuego.consola;
  
      description.innerHTML = `<p><b>Descripción del videojuego:</b><br>${videojuego.descripcion}</p>
                               <p><b>${consolasTexto}</b></p>
                               <p><b>Precio: </b> $${videojuego.precio}</p>`;
  
      cardBody.appendChild(title);
      cardBody.appendChild(description);
  
      const cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
  
      const small = document.createElement('small');
      small.className = 'text-body-secondary';
      small.innerHTML = `
        <button type="button" class="btn btn-warning">Editar</button>
        <button type="button" class="btn btn-danger">Eliminar</button>
      `;
  
      cardFooter.appendChild(small);
  
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      cardDiv.appendChild(cardFooter);
      colDiv.appendChild(cardDiv);
  
      contenedorCartas.appendChild(colDiv);
    });
  }
  
  
  
  // Función para agregar un videojuego
  function agregarVideojuego() {
    // Capturar los datos del formulario
    const nombre = document.getElementById('nombreVideojuego').value.trim();
    const descripcion = document.getElementById('descripcionVideojuego').value.trim();
    const precio = parseFloat(document.getElementById('precioVideojuego').value);
    const imagen = document.getElementById('imagenVideojuego').files[0];
  
    // Capturar consolas seleccionadas
    const consolas = [];
    document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
      consolas.push(checkbox.value);
    });
  
    // Validar datos
    if (!nombre || !descripcion || isNaN(precio) || consolas.length === 0 || !imagen) {
      alert('Todos los campos son obligatorios y se debe seleccionar al menos una consola.');
      return;
    }
  
    // Crear un FormData para enviar los datos, incluyendo la imagen
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('consolas', JSON.stringify(consolas));
    formData.append('imagen', imagen);
  
    // Enviar datos al servidor
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
        // Actualizar la lista de videojuegos
        crearCartas(data);
        alert('Videojuego agregado correctamente.');
        // Limpiar el formulario
        document.getElementById('videojuegoForm').reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al agregar el videojuego.');
      });
  }
  
  // Función para cargar los datos de videojuegos desde el servidor
  function cargarVideojuegos() {
    console.log('Iniciando la carga de videojuegos...'); // Mensaje de depuración
  
    fetch('/api/videojuegos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos de videojuegos.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos del servidor:', data); // Mostrar datos recibidos
        crearCartas(data);
      })
      .catch(error => {
        console.error('Error al cargar los datos de videojuegos:', error);
        const contenedorCartas = document.getElementById('cartasVideojuegos');
        contenedorCartas.innerHTML = '<p>Error al cargar los videojuegos.</p>';
      });
  }
  
  // Llamar a la función para cargar los videojuegos al cargar la página
  document.addEventListener('DOMContentLoaded', cargarVideojuegos);
  