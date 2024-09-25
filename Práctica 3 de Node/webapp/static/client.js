document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", sendReq);
});

const sendReq = async () => {
    const inputText = document.getElementById("inputText").value; // Obtiene el texto del usuario

    if (inputText.trim() === "") {
        alert("Por favor ingresa un texto.");
        return;
    }

    const response = await fetch("/read", {
        method: "POST",
        body: inputText
    });

    document.getElementById("msg").textContent = response.statusText;
    document.getElementById("body").textContent = await response.text();
};
