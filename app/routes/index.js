const express = require('express')
const merchantRoute = require('../controllers/merchant.controller')
const productRoute = require('../controllers/product.controller')
const userRoute = require('../controllers/login.controller')

const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
}) 

router.post('/signup', merchantRoute.signUp)
router.post('/login', merchantRoute.login)
router.delete('/deleteacc/:id', authMiddleware.isAuthenticate, merchantRoute.deleteAccount)

router.post('/product', authMiddleware.isAuthenticate, productRoute.insertProduct)
router.get('/product', authMiddleware.isAuthenticate, productRoute.listProduct)
router.put('/product/:id', authMiddleware.isAuthenticate, productRoute.updateProduct)
router.delete('/product/:id', authMiddleware.isAuthenticate, productRoute.deleteProduct)

router.post('/loginuser', userRoute.loginUser)

module.exports = router