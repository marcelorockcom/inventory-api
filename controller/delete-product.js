import { client } from "../model/connection.js"

export async function delete_products (req, res, next) {

    const {id} = req.body

    if(!id){
        return res.status(400).json({message: "ID is required"})
    }

    const query = `DELETE FROM products WHERE ID=$1 RETURNING *;`
    
    try {
        const result = await client.query(query, [id])

        if(result.rows.length === 0){
            return res.status(404).send('No product found with the provided ID.')
        }

        res.status(200).json({message: 'Product deleted successfully', product: result.rows[0]})
        next()
    } catch (error) {
        console.error(`Error deleting product with ID ${id}: ${error.message}`);
        return res.status(500).send(`Error to deleting the product: ${error.message}`)
    }
    
}