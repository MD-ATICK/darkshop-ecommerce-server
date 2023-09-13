const customerOrderModal = require('../models/customerOrderModal')
const authorOrderModal = require('../models/authorOrderModel')
const moment = require('moment')
const { responseReturn } = require('../utils/responseReturn')


// product order kore jodi product ta delivared hoi ba fetch taile adjust product ar stock -1 korte hobe.
class order_controllers {

    fiveteenMin_payment_check = async (orderId) => {
        const order = await customerOrderModal.findById(orderId)
        if (order.order_payment_status === 'unpaid') {
            await customerOrderModal.findByIdAndUpdate(orderId, { order_delivery_status: 'cancelled' })

            await authorOrderModal.updateMany({ orderId }, { order_delivery_status: 'cancelled' })
        }
    }

    place_order = async (req, res) => {
        const { products, shops, shippingFee, shippingInfo, productsPrice } = req.body

        const customerId = req.user._id
        const tempDate = moment(Date.now()).format('LLL')
        console.log('run place order..')

        const created_order = await customerOrderModal.create({
            customerId,
            products,
            productsPrice,
            shippingFee,
            shippingInfo,
            date: tempDate,
        })

        shops.map(async (s, i) => {
            let price = 0
            let orderProducts = products.filter(p => p.sellerId === s.sellerId)
            orderProducts.map(s => price += Math.floor(s.price - (s.price * (s.discount / 100))))

            await authorOrderModal.create({
                orderId: created_order._id,
                sellerId: s.sellerId,
                orderProducts,
                price,
                shippingInfo,
                date: tempDate
            })

        })

        setTimeout(() => {
            console.log('payment check.⌛')
            this.fiveteenMin_payment_check(created_order._id)
        }, 60000);

        res.status(201).json({ success: 'order placed.✅', order: created_order })
    }


    order_paid = async (req, res) => {
        const { orderId } = req.body
        const order = await customerOrderModal.findById(orderId)
        if (order.order_delivery_status === 'cancelled') {
            return res.status(222).json({ error: 'sorry, order cancelled, page reload.' })
        }
        await customerOrderModal.findByIdAndUpdate(orderId, { order_payment_status: 'paid' })
        await authorOrderModal.updateMany({ orderId }, { order_payment_status: 'paid' })

        res.status(201).json({ success: 'order paided.✅', order })
    }

    customer_orders = async (req, res) => {
        const customerId = req.user._id

        const orders = await customerOrderModal.find({ customerId })
        res.status(200).json({ success: 'customer order getted.', orders })
    }
}

module.exports = new order_controllers()