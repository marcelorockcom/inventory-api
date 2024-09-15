import { client } from './connection.js'

const tableInventory = `
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL,
    cost DECIMAL NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
export const table_products = client.query(tableInventory)
    .then(res => {
        console.log('table create with success or already exists')
    })
    .catch(err => {
        console.error('Erro ao criar a tabela', err.stack)
    })
    .finally(() => {
        client.end()
    })
