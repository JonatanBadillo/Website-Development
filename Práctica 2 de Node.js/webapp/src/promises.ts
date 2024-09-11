import { ServerResponse } from "http";
import { promisify } from "util";

// Importamos la interfaz ServerResponse del módulo http

// Importamos la función promisify del módulo util

// Creamos una constante llamada endPromise que es igual a la función promisify
// aplicada al método end de la clase ServerResponse. También especificamos el tipo
// de dato que espera recibir como argumento (data) y el tipo de dato que devuelve (Promise<void>)
export const endPromise = promisify(ServerResponse.prototype.end) as (data: any) => Promise<void>;


// Exportamos una constante llamada writePromise que es igual a la función promisify
// aplicada al método write de la clase ServerResponse. También especificamos el tipo
// de dato que espera recibir como argumento (data) y el tipo de dato que devuelve (Promise<void>)
export const writePromise = promisify(ServerResponse.prototype.write) as
(data: any) => Promise<void>;