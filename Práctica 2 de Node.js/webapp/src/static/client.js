document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de escucha al botón con el id "btn"
    document.getElementById("btn").addEventListener("click", sendReq);
});

// Función asincrónica para enviar la solicitud
sendReq = async () => {
    let payload = [];
    // Genera un arreglo de objetos con un id y un mensaje
    for (let i = 0; i < 5; i++) {
        payload.push({ id: i, message: `Mensaje de carga: ${i}\n`});
    }
    // Envía una solicitud POST al endpoint "/read" con el payload en formato JSON
    const response = await fetch("/read", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    // Actualiza el contenido del elemento con el id "msg" con el estado de la respuesta
    document.getElementById("msg").textContent = response.statusText;
    // Actualiza el contenido del elemento con el id "body" con el texto de la respuesta
    document.getElementById("body").textContent = await response.text();
}