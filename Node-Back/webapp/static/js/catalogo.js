// Función para crear las cartas de videojuegos
function crearCartas(videojuegos) {
    const contenedorCartas = document.querySelector('.row');
    contenedorCartas.innerHTML = ''; // Limpiar el contenido previo
  
    // Crear una carta por cada videojuego
    videojuegos.forEach(videojuego => {
        // Crear elementos HTML
      const colDiv = document.createElement('div');
      colDiv.className = 'col'; 
  
      // Crear la estructura de la carta
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card h-100';
  
      // Crear la imagen del videojuego
      const img = document.createElement('img');
      img.src = videojuego.imagen;
      img.className = 'card-img-top';
      img.alt = videojuego.nombre;
  
      // Crear el cuerpo de la carta
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      // Crear el título y la descripción del videojuego  
      const title = document.createElement('h5');
      title.className = 'card-title';
      // Crear un enlace con el nombre del videojuego
      title.textContent = videojuego.nombre;
  
      // Crear la descripción del videojuego
      const description = document.createElement('p');
      description.className = 'card-text';
      description.innerHTML = `<p><b>Descripción del videojuego:</b><br>${videojuego.descripcion}</p>
                               <p><b>${videojuego.consola}</b></p>
                               <p><b>Precio: </b> $${videojuego.precio}</p>`;
  
      cardBody.appendChild(title);
      cardBody.appendChild(description);
  
      // Crear el pie de la carta
      const cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
  
      const small = document.createElement('small');
      small.className = 'text-body-secondary';
      small.innerHTML = `
        <button type="button" class="btn btn-warning">Editar</button>
        <button type="button" class="btn btn-danger">Eliminar</button>
      `;
  
      // Agregar los elementos al DOM
      cardFooter.appendChild(small);
  
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      cardDiv.appendChild(cardFooter);
      colDiv.appendChild(cardDiv);
  
      contenedorCartas.appendChild(colDiv);
    });
  }
  
  // Cargar los datos de videojuegos desde el servidor
  fetch('/api/videojuegos')
    .then(response => response.json())
    .then(data => crearCartas(data))
    .catch(error => console.error('Error al cargar los datos de videojuegos:', error));
