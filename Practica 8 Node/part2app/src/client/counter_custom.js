// Importa el módulo Odd desde el archivo odd_custom
import { Odd } from "./odd_custom";

// Importa el módulo Even desde el archivo even_custom
import { Even } from "./even_custom";

// Exporta la función Counter que toma un contexto como parámetro
export const Counter = (context) => `
<button class="btn btn-primary m-2" action="incrementCounter">
Increment
</button>
<div>
${ context.counter % 2 ? Odd(context) : Even(context) }
</div>`