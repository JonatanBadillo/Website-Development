// Función que genera una etiqueta de enlace a una hoja de estilos
export const style = (stylesheet: any) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
}

// Función que retorna el valor dado o cero si es undefined
export const valueOrZero = (value: any) => {
    return value !== undefined ? value : 0;
}

// Función que incrementa el valor dado en 1
export const increment = (value: any) => {
    return Number(valueOrZero(value)) + 1;
}

// Función que verifica si el valor dado es impar
export const isOdd = (value: any) => {
    return Number(valueOrZero(value)) % 2;
}