// Contiene las consultas SQL que se utilizarán en el servidor
const baseSql = `
SELECT Results.*, name, age, years, nextage FROM Results
INNER JOIN People ON personId = People.id
INNER JOIN Calculations ON calculationId = Calculations.id`;

// Consulta para obtener todos los resultados
const endSql = `ORDER BY id DESC LIMIT $limit`;

// Consulta para obtener todos los resultados
export const queryAllSql = `${baseSql} ${endSql}`;
// Consulta para obtener resultados por nombre
export const queryByNameSql = `${baseSql} WHERE name = $name ${endSql}`;
