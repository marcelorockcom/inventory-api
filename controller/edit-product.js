import { client } from "../model/connection.js"

export async function edit_products (req, res, next) {

    let {id, name: name_edit, amount: amount_edit, cost: cost_edit} = req.body

    if(!id){
        return res.status(400).json({message: "ID is required"})
    }
    
    if(!name_edit && !amount_edit && !cost_edit){
        return res.status(400).json({message: "Mininum a field required"})
    }

    if(name_edit && typeof name_edit !== 'string'){
        return res.status(400).json({message: "Name must be a string"})
    }
    
    if(amount_edit && typeof amount_edit !== 'number'){
        return res.status(400).json({message: "Amount must be a string"})
    }
    
    if(cost_edit && typeof cost_edit !== 'number'){
        return res.status(400).json({message: "Cost must be a string"})
    }

    const query = `SELECT * FROM products WHERE ID=$1;`
    
    try {
        const result = await client.query(query, [id])

        if(result.rows.length === 0){
            return res.status(404).json({message: 'No product found with the provided ID.'})
        }

        const {name, amount, cost} = result.rows[0]

        name_edit = name_edit || name
        amount_edit = amount_edit || amount
        cost_edit = cost_edit || cost

        const query_update = `
            UPDATE products SET name = $1, amount = $2, cost = $3 
            WHERE ID = $4
            RETURNING *;    
        `

        const update = await client.query(query_update, [name_edit, amount_edit, cost_edit, id])

        res.status(200).json({message: 'Product updated successfully', product: update.rows[0]})
        next()
    } catch (error) {
        console.error(`Error deleting product with ID ${id}: ${error.message}`);
        return res.status(500).send(`Error to deleting the product: ${error.message}`)
    }
    
}