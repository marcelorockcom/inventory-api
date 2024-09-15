import { client } from "../model/connection.js"

export async function add_product (req, res, next) {
    const {name, amount, cost} = req.body

    if(!name || !amount || !cost){
        return res.status(400).json({message: 'All fields are required'})
    }

    if(name && typeof name !== 'string'){
        return res.status(400).json({message: "Name must be a string"})
    }
    
    if(amount && typeof amount !== 'number'){
        return res.status(400).json({message: "Amount must be a string"})
    }
    
    if(cost && typeof cost !== 'number'){
        return res.status(400).json({message: "Cost must be a string"})
    }
    
    try {
        const checkExists = await client.query('SELECT * FROM products where name=$1', [name])

        if(checkExists.rows.length > 0){
            return res.status(409).json({message: 'Product already exist'})
        }

        const query = `
            INSERT INTO products (name, amount, cost) 
            VALUES ($1, $2, $3)
            RETURNING *;    
        `

        const values = [name, amount, cost]
        const result = await client.query(query, values)

        return res.status(201).json({message: 'Product added successfully', product: result.rows[0]})

    } catch (error) {
        console.error(`Error inserting product: ${error.message}`);
        return res.status(500).json({ message: `Error inserting product: ${error.message}` });
    } finally {
        next()
    }

}