const db = require("../models");
const Order = db.Order;
const Product = db.Product;

const orderController = {
    getOrders: async (req, res) => {
        const orders = await Order.findAll({
            include: [
                { model: Product, as: 'Products' },
            ]
        });
        res.json({
            status: 'success',
            message: '資料蒐取成功',
            orders
        })
    },
}

module.exports = orderController;