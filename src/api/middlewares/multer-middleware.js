import multer from "multer";
import { __dirname, join } from "../utils/index.js";
import path from "path"
import { randomUUID } from "crypto";

// config del storage: diskStorage se guarda en el disco
const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {  
        callback(null, join(__dirname, "src/public/img")
        )
    }
    , filename: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase() //la extension 
        const nombreFichero = randomUUID() + ext; //id aleatoria y extension
        callback(null, nombreFichero)
    }
})

const fileFilterConfig = (req,file,callback) => {
    const tiposPermitidos = ["image/png", "image/jpeg", "image/webp"]
    const tipo = file.mimetype //tipo del fichero
    if (!tiposPermitidos.includes(tipo)) {
        return callback(new Error("Tipo de archivo no permitido"), false);
    }
    callback(null, true);
}

export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError){
        return res.status(400).json({
            error: err.code,
            message: err.message
        })
    }
    if (err){
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        error: "Error desconocido en subida de archivos"
    });
}

// cargador: donde se guardará, limite de tamaño del fichero y filtro personalizado (solo tipo de imagenes q yo permito)
export const multerUploader = multer({
    storage: storageConfig,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: fileFilterConfig,
}) 