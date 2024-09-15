import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const {Client} = pg

export const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

client.connect()
    .then(() => console.log("conectado com sucesso"))
    .catch(err => console.error('Erro ao conectar:', err.stack))