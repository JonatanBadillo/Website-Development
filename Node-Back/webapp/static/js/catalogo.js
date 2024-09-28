// Función para crear las cartas de videojuegos
function crearCartas(videojuegos) {
  // Obtener el contenedor donde se agregarán las tarjetas de videojuegos
  const contenedorCartas = document.getElementById('cartasVideojuegos');
  
  // Limpiar el contenido 
  contenedorCartas.innerHTML = ''; 

  // Verificar si hay videojuegos para mostrar
  if (!videojuegos || videojuegos.length === 0) {
      contenedorCartas.innerHTML = '<p>No hay videojuegos disponibles.</p>';
      return;
  }

  // Recorrer cada videojuego y crear su tarjeta
  videojuegos.forEach(videojuego => {
      console.log('Creando tarjeta para:', videojuego.nombre); // Mensaje 

      // Crear un elemento 'div' para la columna 
      const colDiv = document.createElement('div');
      colDiv.className = 'col';

      // Crear un elemento 'div' para la tarjeta 
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card h-100';

      // Crear un elemento 'img' para mostrar la imagen del videojuego
      const img = document.createElement('img');
      img.src = videojuego.imagen; // Asignar la URL de la imagen
      img.className = 'card-img-top'; // Asignar la clase para el estilo
      img.alt = videojuego.nombre; // Asignar un texto alternativo para la imagen

      // Mostrar la ruta de la imagen en la consola 
      console.log('Ruta de la imagen:', img.src);

      // Crear un elemento 'div' para el cuerpo de la tarjeta 
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      // Crear un elemento 'h5' para el título de la tarjeta 
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = videojuego.nombre;

      // Crear un elemento 'p' para la descripción del videojuego
      const description = document.createElement('p');
      description.className = 'card-text';

      // Verificar si 'consola' es un arreglo o un string
      let consolasTexto = Array.isArray(videojuego.consola) ? videojuego.consola.join(', ') : videojuego.consola;

      // Asignar el contenido HTML con la descripción, consolas y precio del videojuego
      description.innerHTML = `<p><b>Descripción del videojuego:</b><br>${videojuego.descripcion}</p>
                               <p><b>${consolasTexto}</b></p>
                               <p><b>Precio: </b> $${videojuego.precio}</p>`;

      // Agregar el título y la descripción al cuerpo de la tarjeta
      cardBody.appendChild(title);
      cardBody.appendChild(description);

      // Crear un elemento 'div' para el pie de la tarjeta y asignar la clase 'card-footer'
      const cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';

      // Crear un elemento 'small' para contener los botones de "Editar" y "Eliminar"
      const small = document.createElement('small');
      small.className = 'text-body-secondary';
      small.innerHTML = `
          <button type="button" class="btn btn-warning">Editar</button>
          <button type="button" class="btn btn-danger">Eliminar</button>
      `;

      // Agregar los botones al pie de la tarjeta
      cardFooter.appendChild(small);

      // Construir la tarjeta agregando la imagen, el cuerpo y el pie a la tarjeta
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      cardDiv.appendChild(cardFooter);

      // Agregar la tarjeta a la columna
      colDiv.appendChild(cardDiv);

      // Finalmente, agregar la columna al contenedor principal de tarjetas
      contenedorCartas.appendChild(colDiv);
  });
}


// Función para agregar un videojuego
function agregarVideojuego() {
  // Capturar los datos del formulario (nombre, descripción, precio, imagen)
  const nombre = document.getElementById('nombreVideojuego').value.trim();
  const descripcion = document.getElementById('descripcionVideojuego').value.trim();
  const precio = parseFloat(document.getElementById('precioVideojuego').value);
  const imagen = document.getElementById('imagenVideojuego').files[0];

  // Capturar las consolas seleccionadas en un arreglo
  const consolas = [];
  document.querySelectorAll('#videojuegoForm .form-check-input:checked').forEach(checkbox => {
      consolas.push(checkbox.value);
  });

  // Validar los datos del formulario
  if (!nombre || !descripcion || isNaN(precio) || consolas.length === 0 || !imagen) {
      alert('Todos los campos son obligatorios y se debe seleccionar al menos una consola.');
      return; // Salir de la función si hay algún error en la validación
  }

  // Crear un objeto FormData para enviar los datos
  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio', precio);
  formData.append('consolas', JSON.stringify(consolas)); // Convertir las consolas a una cadena JSON
  formData.append('imagen', imagen);

  // Enviar los datos al servidor usando fetch
  fetch('/api/videojuegos', {
      method: 'POST',
      body: formData,
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al agregar el videojuego.');
      }
      return response.json(); // Convertir la respuesta a JSON
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
  console.log('Iniciando la carga de videojuegos...'); // Mensaje 

  // Hacer una solicitud al servidor para obtener la lista de videojuegos
  fetch('/api/videojuegos') // fetch por defecto es GET
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al cargar los datos de videojuegos.');
      }
      return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
      console.log('Datos recibidos del servidor:', data); // Mostrar los datos recibidos en la consola
      crearCartas(data); // Crear las tarjetas de los videojuegos con los datos recibidos
  })
  .catch(error => {
      console.error('Error al cargar los datos de videojuegos:', error);
      const contenedorCartas = document.getElementById('cartasVideojuegos');
      contenedorCartas.innerHTML = '<p>Error al cargar los videojuegos.</p>'; // Mostrar mensaje de error
  });
}

// Llamar a la función para cargar los videojuegos cuando la página haya terminado de cargarse
document.addEventListener('DOMContentLoaded', cargarVideojuegos);

