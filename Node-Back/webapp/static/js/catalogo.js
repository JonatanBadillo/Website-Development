// Función para crear las cartas de videojuegos
function crearCartas(videojuegos) {
    const contenedorCartas = document.querySelector('.row');
    contenedorCartas.innerHTML = ''; // Limpiar el contenido previo
  
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
      description.innerHTML = `<p><b>Descripción del videojuego:</b><br>${videojuego.descripcion}</p>
                               <p><b>${videojuego.consola}</b></p>
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
  
  // Cargar los datos de videojuegos desde el servidor
  fetch('/api/videojuegos')
    .then(response => response.json())
    .then(data => crearCartas(data))
    .catch(error => console.error('Error al cargar los datos de videojuegos:', error));
  