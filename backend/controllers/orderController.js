const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const ProductModel=require('../models/productModel')
exports.createOrder = async (req, res, next) => {
    try {
        const cartItems = req.body;

        if (!Array.isArray(cartItems)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart items format'
            });
        }

        const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * (item.qty || 1), 0).toFixed(2));
        console.log(amount)
        const status = 'pending';

        const order = await orderModel.create({ cartItems, amount, status });

        cartItems.forEach(async(item)=>{
            const product=await productModel.findById(item.product._id)
            product.stock=product.stock-item.qty
             await product.save();

        })

        res.json({
            success: true,
         
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
