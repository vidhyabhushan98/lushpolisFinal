const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    userId : String,
    products: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
        description: String,
        category: String,
        sellerName: String,
      }],
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
