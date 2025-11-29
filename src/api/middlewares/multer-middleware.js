import multer from "multer";
import { __dirname, join } from "../utils/index.js";
import path from "path"
import { randomUUID } from "crypto";

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, join(__dirname, "src/public/img")
        )
    }
    , filename: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase()
        const nombreFichero = randomUUID() + ext;
        callback(null, nombreFichero)
    }
})

const fileFilterConfig = (req,file,callback) => {
    const tiposPermitidos = ["image/png", "image/jpeg", "image/webp", "image/gif"]
    const tipo = file.mimetype
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

export const multerUploader = multer({
    storage: storageConfig,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: fileFilterConfig,
}) 