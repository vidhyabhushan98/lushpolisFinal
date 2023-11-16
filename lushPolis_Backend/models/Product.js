const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    userId : String,
    sellerName: String,
    title: String,
    description: String,
    summary: String,
    onSale: Boolean,
    price: Number,
    itemsCount: Number,
    category: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    image: [{public_id:{type:String}, url:{type:String}}],
    rating:[{rate:{type:Number}, user:{type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    createdAt : Date,
    tags: {type:String},
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
