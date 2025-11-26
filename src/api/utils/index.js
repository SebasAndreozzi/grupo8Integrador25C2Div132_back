// logica para trabajar ruta de proyectos

// importacion de modulos para trabajar con rutas

import { fileURLToPath } from "url";
import { dirname, join } from "path";

// logica para obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url); // Convertimos las rutas file de nuestra carpeta /public en rutas normales
                                    // ↑ proporciona la url absoluta
//                      ↑ convierte el fichero de ruta en un ruta de sistema   
// obtenemos el directoria del archivo del archivo
const __dirname = join(dirname(__filename), "../../../"); // Apuntamos a la carpeta raiz del proyecto retrocediento 3 niveles -> utils a api, api a src, src a carpetaRaiz

export {
    __dirname,
    join
}

