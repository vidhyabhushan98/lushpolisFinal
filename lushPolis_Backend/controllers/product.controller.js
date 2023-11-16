const Product = require('../models/Product');
const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');
const Cart = require('../models/Cart');
const Favorite = require('../models/Favorite');
const cloudinary = require('../config/cloudinary');

exports.addProduct = async (req, res) => {
    const{userId, sellerName, title,  description, summary, price, itemsCount, category, image} = req.body;
    //console.log(userId, sellerName, title,  description, summary, price, itemsCount, category, image);
    if(!userId || !title || !description || !summary || !category || !image ||!itemsCount){
        console.log("missing fields")
        return res.status(422).json({error: "Please add all the fields"});
    }
    try{
        console.log("inside try");
        const imageUrl = await cloudinary.uploader.upload(image, {
            folder:"products",
        }, (err, result) => {
            if(err){
                console.log("Error in uploading product image: ", err);
                return res.status(500).json({error: "Something went wrongin image upload"});
            }
        });
        console.log("image uploaded successfully");
        const product = new Product({
                userId,
                sellerName, 
                title,
                description,
                summary,
                price,
                itemsCount,
                category,
                onSale: true,
                image: [{public_id:imageUrl.public_id, url:imageUrl.url}],
                rating: [],
                createdAt: new Date(),
            });
            console.log("product created successfully");
        product.save()
        console.log("product saved successfully");
        User.findByIdAndUpdate(userId, {$push:{products:product._id}}, {new:true}).exec();
        res.json({message: "Product saved successfully", productId: product._id});
    }
    catch(err){
        res.status(500).json({error: "Something went wrong"});
        console.log(err);
    }
}

exports.deleteProduct = async (req, res) => {
    const {id} = body;
    Product.findByIdAndDelete(id)
    .then((product) => {
        res.json({message: "Product deleted successfully"});
    })
    .catch((err) => {
        console.log(err);
    });
}


exports.buyProduct= async (req, res) => {
    const {user} = req.body;
    //empty the cart of the user and mark those product boolean value onSale to false and check if any product quantity in cart is more than item count or if any product is not available
   try{
        const cart = await Cart.findById(user.cartId);
        const products = cart.products;
        const productIDs = products.map((item) => item.product);
        const Products = await Product.find({_id:{$in:productIDs}});

        let flag = 0;
        for(let i=0; i<products.length; i++){
            if(products[i].quantity > Products[i].itemsCount){
                flag = 1;
                break;
            }
        }
        if(flag == 0){
            for(let i=0; i<products.length; i++){
                Products[i].itemsCount -= products[i].quantity;
                Products[i].save();
            }
            cart.products = [];
            cart.save();
            console.log("order placed successfully");
            res.json({cart:cart,message: "Order placed successfully"});
        }
        else{
            res.status(200).json({error: "Some products are not available."});
        }
   }
    catch(err){
         console.log(err);
         res.status(500).json({error: "Something went wrong"});
    }
}


exports.getProducts = async (req, res) => {  
    Product.find()
    .then((products) => {
        res.json({products});
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.addRating = async (req, res) => {
    const {productId, userId, rating} = req.body;
    console.log("inside rating",productId, userId, rating);
    Product.findById(productId)
    .then((product) => {
        console.log("product found")
        const productRating = product.rating;
        const userRating = productRating.filter((item) => item.user == userId);
        //if user already rated update rating
        console.log("product rating updated 0");
        if(userRating.length > 0){
            //update new rating
            productRating.pull(userRating[0]._id);
        }
        console.log("product rating updated 1");
        productRating.push({rate: rating, user: userId });
        console.log("product rating updated 2");
        product.rating = productRating;
        console.log("product rating updated 3");
        product.save();
        res.json({product});
        console.log(product);
        console.log("rating added successfully");
    })
    .catch((err) => {
        console.log(err);
    });
}


exports.singleProduct = async (req, res) => {
    const {id} = req.params;
    Product.findById(id)
    .then((product) => {
        res.json({product});
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.searchResults = async (req, res) => {
    const {query} = req.body;
    console.log("search query prodcuts",query);
    const searchOptions = 'i';
    if (!query) {
        return res.status(400).json({
            error: 'Search query is required.'
        });
    }
    
    const regexQuery = query.split(' ').join(`.*`);
    console.log("search regex query prodcuts",regexQuery);
    await Product.find({
        $or: [
          { title: { $regex: regexQuery, $options: searchOptions } },
          { description: { $regex: regexQuery, $options: searchOptions } }
        ]
  })
  .then((products) => {
    res.json({products});
    })
    .catch((err) => {
    console.log(err);
  });
}


exports.fetchCart = async(req,res) => {
    const {cartId} = req.body;
    console.log("fetching cart with id", cartId)
    try{
        const cart = await Cart.findById(cartId).catch((err) => {
            console.log(err);
        });
        if(!cart){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("fetched cart", cart)
        res.json({ cart: cart });
    } 
    catch(err) {
        console.log(err.toString());
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addToCart = async(req, res) => {
    const { product, userId } = req.body;
    const productId = product._id;
    console.log("adding this product to cart",product.quantity, userId);
    const quantity = product.quantity;
    try{
        const product = await Product.findById(productId).catch((err) => {
            console.log(err);
        });
        
        if(!product){
            return res.status(400).json({ error: 'Invalid request' });
        }
        
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
       
        const cart = await Cart.findById(user.cartId).catch((err) => {
            console.log(err);
        });
        
        if(!cart){
            return res.status(400).json({ error: 'Invalid request' });
        }
        
        //check if cart already has this product by looking at cart.products ids by iterating 
        for(let i=0; i<cart.products.length; i++){
            if(cart.products[i].product == productId){
                return res.json({ message: 'Product already in cart' });
            }
        }
        
        const productDetails = {
            product: product._id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.image[0].url,
            sellerName: product.sellerName,
            description: product.description,
            category: product.category,
        }
        console.log("product details", productDetails)
        
        cart.products.push(productDetails);
        await cart.save();
       
        res.json({ product: productDetails, message: 'Successfully added to cart' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeFromCart = async(req, res) => {
    const { productId, userId } = req.body;
    console.log(productId, userId);
    try{
        const product = await Product.findById(productId).catch((err) => {
            console.log(err);
        });
        console.log("step 1 done")
        if(!product){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("step 2 done")
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        console.log("step 3 done")
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("step 4 done")
        const cart = await Cart.findById(user.cartId).catch((err) => {
            console.log(err);
        });
        console.log("step 5 done")
        if(!cart){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("step 6 done")
        //iterate over cart.products and remove the product with productId
        for(let i=0; i<cart.products.length; i++){
            if(cart.products[i].product == productId){
                cart.products.pull(cart.products[i]._id);
            }
        }
        console.log("step 7 done")
        await cart.save();
        console.log("step 8 done")
        res.json({ cart });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addToFavorite = async(req, res) => {
    const { product, userId } = req.body;
    const productId = product._id;
    console.log(productId, userId);
    try{
        const product = await Product.findById(productId).catch((err) => {
            console.log(err);
        });
        if(!product){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const favorite = await Favorite.findById(user.favoriteId).catch((err) => {
            console.log(err);
        });
        if(!favorite){
            return res.status(400).json({ error: 'Invalid request' });
        }
        //check if it is already in favorite products 
        for(let i=0; i<favorite.products.length; i++){
            if(favorite.products[i].product == productId){
                return res.json({ message: 'Product already in fav' });
            }
        }
        const productDetails = {
            product: product._id,
            title: product.title,
            price: product.price,
            image: product.image[0].url,
            sellerName: product.sellerName,
            description: product.description,
            quantity: product.quantity,
            category: product.category,
        }
        favorite.products.push(productDetails);
        await favorite.save();
        res.json({ product:productDetails,message: 'Successfully added to favorite' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeFromFavorite = async(req, res) => {
    try{
        const { productId, user } = req.body;
        console.log(productId, user);
        //remove productId from favorite products
        const favorite = await Favorite.findById(user.favoriteId).catch((err) => {
            console.log(err);
        }
        );
        console.log("step 1")
        if(!favorite){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("step 2")
        // if(!favorite.products.findById(productId)){
        //     return res.status(400).json({ message: 'Product not in favorite' });
        // }
        //check if product id is not in favorite products
        for(let i=0; i<favorite.products.length; i++){
            if(!favorite.products[i].product == productId){
                return res.json({ message: 'Product not in favorite' });
            }
        }
        console.log("step 3")
        favorite.products.pull(productId);
        console.log("step 4")
        await favorite.save();
        res.json({ message: 'Successfully removed from favorite' });
    }
    catch(error){
        console.log(error.toString());
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeFromFavorite2 = async(req, res) => {
    try{
        const { productId, user } = req.body;
        console.log(productId, user);
        //remove productId from favorite products
        const favorite = await Favorite.findById(user.favoriteId).catch((err) => {
            console.log(err);
        }
        );
        console.log("step 1")
        if(!favorite){
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log("step 2")
        // if(!favorite.products.findById(productId)){
        //     return res.status(400).json({ message: 'Product not in favorite' });
        // }
        //check if product id is not in favorite products
        for(let i=0; i<favorite.products.length; i++){
            if(favorite.products[i].product == productId){
                //remove this item 
                favorite.products.pull(favorite.products[i]._id);
            }
        }
        console.log("step 3")
        console.log("step 4")
        await favorite.save();
        res.json({ message: 'Successfully removed from favorite' });
    }
    catch(error){
        console.log(error.toString());
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.fetchFavorite = async(req, res) => {
    const { favoriteId } = req.body;
    console.log(favoriteId);
    try{
        const favorite = await Favorite.findById(favoriteId).catch((err) => {
            console.log(err);
        });
        if(!favorite){
            return res.status(400).json({ error: 'Invalid request' });
        }
        res.json({ favorite: favorite });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


// exports.addRating = async(req, res) => {
//     const { productId, userId, rating } = req.body;
//     console.log("in product rating",productId, userId, rating);
//     try{
//         const product = await Product.findById(productId).catch((err) => {
//             console.log(err);
//         });
//         if(!product){
//             return res.status(400).json({ error: 'Invalid request' });
//         }
//         const user = await User.findById(userId).catch((err) => {
//             console.log(err);
//         }
//         );
//         if(!user){
//             return res.status(400).json({ error: 'Invalid request' });
//         }
//         const productRating = product.rating;
//         const userRating = productRating.filter((item) => item.user == userId);
//         if(userRating.length > 0){
//             return res.status(400).json({ message: 'Product already rated' });
//         }
//         productRating.push({rate: rating, user: userId});
//         product.rating = productRating;
//         await product.save();
//         res.json({ message: 'Successfully rated' });
//     }
//     catch(error){
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

exports.removeRating = async(req, res) => {
    const { productId, userId } = req.body;
    console.log(productId, userId);
    try{
        const product = await Product.findById(productId).catch((err) => {
            console.log(err);
        });
        if(!product){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const user = await User.findById(userId).catch((err) => {
            console.log(err);
        });
        if(!user){
            return res.status(400).json({ error: 'Invalid request' });
        }
        const productRating = product.rating;
        const userRating = productRating.filter((item) => item.user == userId);
        if(userRating.length == 0){
            return res.status(400).json({ message: 'Product not rated' });
        }
        productRating.pull(userRating[0]._id);
        product.rating = productRating;
        await product.save();
        res.json({ message: 'Successfully removed rating' });
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}