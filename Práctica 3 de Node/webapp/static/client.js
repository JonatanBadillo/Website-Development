document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", sendReq);
});

const sendReq = async () => {
    let payload = "HELLO, WORLD!"; // Contenido para enviar al servidor

    const response = await fetch("/read", {
        method: "POST",
        body: payload
    });

    document.getElementById("msg").textContent = response.statusText;
    document.getElementById("body").textContent = await response.text();
};
