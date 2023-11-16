const controller = require('../controllers/product.controller');

module.exports = (app) => {

    app.post('/addProduct', function(req, res){
        console.log("addProduct started");
        controller.addProduct(req, res);
        console.log("addProduct Done");
    });

    app.post('/deleteProduct', function(req, res){
        console.log("deleteProduct started")
        controller.deleteProduct(req, res);
        console.log("deleteProduct done")
    });

    app.get('/getProducts/:id', function(req, res){
        console.log("get product started")
        controller.singleProduct(req, res);
        console.log("get product done")
    });

    app.post('/buyProduct', function(req, res){
        console.log("buyProduct started")
        controller.buyProduct(req, res);
        console.log("buyProduct done")
    });

    app.get('/getProducts', function(req, res){
        console.log("getProducts");
        controller.getProducts(req, res);
        console.log("getProducts Done");
    });

    app.post('/searchProducts', function (req,res){
        console.log("search Product")
        controller.searchResults(req,res);
        console.log("search Products Done")
    });

    app.post('/addRating', function (req,res){
        console.log("addRating")
        controller.addRating(req,res);
        console.log("addRating Done")
    });

    app.post('/fetchCart', function(req, res){
        console.log("fetchCart started")
        controller.fetchCart(req, res);
        console.log("fetchCart done")
    });

    app.post('/addToCart', function(req, res){
        console.log("addToCart started")
        controller.addToCart(req, res);
        console.log("addToCart done")
    });

    app.post('/removeFromCart', function(req,res){
        console.log("removeFromCart started")
        controller.removeFromCart(req,res);
        console.log("removeFromCart done")
    });

    app.post('/addToFavorite', function(req, res){
        console.log("addToFavorite started")
        controller.addToFavorite(req, res);
        console.log("addToFavorite done")
    });

    app.post('/removeFromFavorite', function(req,res){
        console.log("removeFromFavorite started")
        controller.removeFromFavorite(req,res);
        console.log("removeFromFavorite done")
    });

    app.post('/removeFromFavorite2', function(req,res){
        console.log("removeFromFavorite started")
        controller.removeFromFavorite2(req,res);
        console.log("removeFromFavorite done")
    });

    app.post('/fetchFavorite', function(req, res){
        console.log("fetchFavorite started")
        controller.fetchFavorite(req, res);
        console.log("fetchFavorite done")
    });

    app.post('/addRating', function(req, res){
        console.log("addRating started")
        controller.addRating(req, res);
        console.log("addRating done")
    });

    app.post('/removeRating', function(req,res){
        console.log("removeRating started")
        controller.removeRating(req,res);
        console.log("removeRating done")
    });
}
