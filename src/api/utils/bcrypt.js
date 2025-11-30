import bcrypt from "bcrypt"

const salt = 12;
// hash: hasheando se guarda en la bdd 
// password: el usuario ingresa contraseña todavia no hasheada
export async function hashPassword(password){
    if(password.length < 4)
    {
        throw new Error("Contraseña con menos de 4 caracteres");
    }
    return await bcrypt.hash(password, salt)
}

// compara el password sin hasheado y lo hashea
export async function comparePassword(password, hash) {
    return await bcrypt.compare(password,hash)
}