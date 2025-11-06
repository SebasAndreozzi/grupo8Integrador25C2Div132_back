import dotenv from "dotenv"

dotenv.config();

export default{
    port: process.env.PORT,
    database: {
        host : process.env.DB_HOST,
        name : process.env.DB_NAME,
        user : process.env.DB_USER,
        pass : process.env.DB_PASS
    } 
}