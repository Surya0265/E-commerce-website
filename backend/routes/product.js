const  express=require('express')
const { getProducts } = require('../controllers/productController')
const router=express.Router()
const { getsingleProduct } = require('../controllers/productController')



router.route('/products').get(getProducts)
router.route('/products/:id').get(getsingleProduct)

module.exports= router;