const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../../models/index')
const Validator = require('validatorjs');
const rules = require('./validator');
const { raw } = require('express');

function signUp(req, res) {
    let form = {username:req.body.username, password:bcrypt.hashSync(req.body.password, 10), address:req.body.address, phone_number: req.body.phone_number}
    let validation = new Validator(req.body, rules.merchantRules)

    if (validation.passes()) {
        return res.status(200).send({message: 'Merchant has been registered.'})
    }    
    else {
        return res.status(400).send({message: 'Error on: ', data : validation.errors.all()})
            } 
}


async function login(req, res) {
    try {
        const results = await models.merchant.findOne({where: { username: req.body.username }})
        if (results.length < 1) {
            return res.status(204).send({ message: 'Username or password is invalid' })
        }

        if (!bcrypt.compareSync(req.body.password, 10, results.password)) {
            return res.status(400).send({ message: 'Username or password is invalid' })
        }
    
        const payload = {
            id: results.id,
            username: results.username,
        
        }
        const token = jwt.sign(payload, 'secret', { expiresIn: '7d' })
    
        return res.status(200).send({ message: 'Login Success', data: { token: token } })
    } 

    catch (error) {
    return res.status(404).send({ message: 'Username or password is invalid' })
    }
}


async function deleteAccount(req, res) {
    try{
    const resultDelete = await models.merchant.destroy({ where: { id: req.params.id } },
        {raw: true}
        );
    if (!resultDelete) {
        throw {message: "Delete Account Failed"}
    }
    return res.status(200).send ({message: 'Merchant has been deleted.'})  
    }
    catch (error) {
        res.status(400).json(error.message)
    }

}

module.exports = {
    signUp,
    login,
    deleteAccount
}
