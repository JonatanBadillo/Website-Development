// // document.addEventListener('DOMContentLoaded', function() {
// //     document.getElementById("btn").addEventListener("click", sendReq);
// //     });
// //     sendReq = async () => {
// //     const response = await fetch("/test", {
// //     method: "POST", body: JSON.stringify({message: "Hello, World"}),
// //     headers: { "Content-Type": "application/json" }
// //     });
// //     document.getElementById("msg").textContent = response.statusText;
// //     document.getElementById("body").innerHTML = await response.text();
// //     };

// import { Counter } from "./counter_custom";

// // Contexto inicial con el contador en 0
// const context = {
//     counter: 0
// }

// // Acciones disponibles, en este caso incrementar el contador
// const actions = {
//     incrementCounter: () => {
//         context.counter++; // Incrementa el contador
//         render(); // Vuelve a renderizar la vista
//     }
// }

// // Función para renderizar el componente Counter con el contexto actual
// const render = () => {
//     document.getElementById("target").innerHTML = Counter(context);
// }

// // Espera a que el DOM esté completamente cargado
// document.addEventListener('DOMContentLoaded', () => {
//     // Agrega un listener para detectar clics en el documento
//     document.onclick = (ev) => {
//         // Obtiene el atributo "action" del elemento clicado
//         const action = ev.target.getAttribute("action")
//         // Si existe una acción y está definida en las acciones, la ejecuta
//         if (action && actions[action]) {
//             actions[action]()
//         }
//     }
//     // Renderiza la vista inicial
//     render();
// });

// document.addEventListener('DOMContentLoaded', ()=>{
//     // do nothing
// })

import validator from "validator";
export const validate = (propName, formdata) => {
  const val = formdata.get(propName);
  const results = {};
  const validationChain = {
    get propertyName() {
      return propName;
    },
    get results() {
      return results;
    },
  };
  validationChain.required = () => {
    results.required = !validator.isEmpty(val, { ignore_whitespace: true });
    return validationChain;
  };
  validationChain.minLength = (min) => {
    results.minLength = validator.isLength(val, { min });
    return validationChain;
  };
  validationChain.isInteger = () => {
    results.isInteger = validator.isInt(val);
    return validationChain;
  };
  return validationChain;
};
