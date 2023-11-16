const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Favorite = require("../models/Favorite");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
  
    try {
      const savedUser = await User.findOne({ email: email });
  
      if (savedUser) {
        return res.status(422).json({ error: "User already exists with that email" });
      }
  
      const hashedpassword = await bcrypt.hash(password, 12);
  
      const cart = new Cart({
        products: [],
      });
      const savedCart = await cart.save();
  
      const favorite = new Favorite({
        products: [],
      });
      const savedFavorite = await favorite.save();
  
      const user = new User({
        name,
        email,
        password: hashedpassword,
        followers: [],
        following: [],
        posts: [],
        bio: "",
        newMessages: {},
        diaries: [],
        bookmarks: [],
        cartId: savedCart._id,
        favoriteId: savedFavorite._id,
        status: "offline",
      });
  
      const UserinDB = await user.save();
      //save the user ID to above cart and favorite
      await Cart.findByIdAndUpdate(savedCart._id, { userId: UserinDB._id });
      await Favorite.findByIdAndUpdate(savedFavorite._id, { userId: UserinDB._id });

      res.json({ message: "saved successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

exports.login = async(req, res) => {
    console.log("Login called");
    console.log(req.body);
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(422).json({ error: "Please add email or password" });
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(422).json({ error: "Email-id Not Found" });
        }
        const correctPassword = await bcrypt.compare(password,user.password);
        if(!correctPassword){
            return res.status(422).json({ error: "Invalid password" });
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        // console.log(user);
        const userWithToken = {
          ...user._doc,
          token: token,
        };
        res.status(200).json({user:userWithToken});
    }
    catch(e)
    {
        console.log("Inside error",e)
        res.status(400).send()
    }
}


exports.validateToken = (req, res) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.json(false);
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.json(false);
        return res.json(true);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}