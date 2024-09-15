import express from 'express'
import bp from 'body-parser';
import { add_product } from './controller/new-product.js';
import { get_products } from './controller/get-products.js';
import { delete_products } from './controller/delete-product.js';
import { edit_products } from './controller/edit-product.js';
const app = express()

app.use(bp.json())

app.get('/', get_products, (req, res) => {
    console.log('GET ALL PRODUCTS')
})

app.post('/', add_product, (req, res) => {
    console.log('ADD')
})

app.put('/', edit_products, (req, res) => {
    console.log('EDIT')
})

app.delete('/', delete_products, (req, res) => {
    console.log('DELETE')
})

app.listen(3000, ()=> {
    console.log("Server started in the address: http://localhost:3000/")
})