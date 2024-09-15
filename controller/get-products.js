import { client } from "../model/connection.js"

export async function get_products (req, res, next) {
    const query = `SELECT * FROM products;`
    
    try {
        const produts = await client.query(query)

        if(produts.rows.length === 0){
            return res.status(404).send('No produts found.')
        }

        res.status(200).json({products: produts.rows})
        next()
    } catch (error) {
        return res.status(500).send(`Error retrieving products: ${error.message}`)
    }
    
}