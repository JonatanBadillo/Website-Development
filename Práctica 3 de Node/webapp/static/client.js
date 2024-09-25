document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento click al botón , que llama a la función sendReq
    document.getElementById("btn").addEventListener("click", sendReq);
});

// Función que envía una solicitud POST al servidor
const sendReq = async () => {
    // Obtiene el valor del campo de texto del usuario
    const inputText = document.getElementById("inputText").value;

    // Verifica si el campo de texto está vacío
    if (inputText.trim() === "") {
        alert("Por favor ingresa un texto.");
        return;
    }

    // Envía una solicitud POST al servidor con el texto ingresado por el usuario
    const response = await fetch("/read", {
        method: "POST",
        body: inputText
    });

    // Actualiza el contenido de los elementos HTML con la respuesta del servidor 
    document.getElementById("msg").textContent = response.statusText;
    document.getElementById("body").textContent = await response.text();
};
