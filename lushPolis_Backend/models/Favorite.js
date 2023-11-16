const mongoose = require('mongoose');
const FavoriteSchema = new mongoose.Schema({
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
const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
