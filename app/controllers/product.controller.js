const models = require('../../models/index') 
const Validator = require('validatorjs')
const rules = require('./validator')

function insertProduct(req, res) {
    let form = {name: req.body.name, quantity: req.body.quantity, price: req.body.price}
    let validation = new Validator(req.body, rules.productRules)
    if (validation.passes()) {
        return res.status(200).send({message: 'Product has been inserted', data: form })
    }    
    else {
        return res.status(400).send({message: 'Error on: ', data : validation.errors.all()})
            } 
}

async function listProduct(req, res) {
    const result = await models.product.findAll()
    if (result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Product is found', data: result })
}

function updateProduct(req, res) {
    let form = models.product.update(data, {where: {name: req.body.name, quantity: req.body.quantity, price: req.body.price}})
    let validation = new Validator(req.body, rules.productRules)
    if (validation.passes()) {
        return res.status(200).send({message: 'Product has been updated', data: form })
    }    
    else {
        return res.status(400).send({message: 'Error on: ', data : validation.errors.all()})
            } 
}

async function deleteProduct(req, res) {
    let form = models.product.destroy({ where: { id: req.params.id } })
    let validation = new Validator(form, rules.productRules)
    if (validation.passes()) {
        return res.status(200).send({message: 'Product has been deleted', data: form })
    }    
    else {
        return res.status(400).send({message: 'Delete product failed'})
            } 
}

module.exports = {
    insertProduct,
    listProduct,
    updateProduct,
    deleteProduct
}