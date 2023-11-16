const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: String,
    image: {public_id:{type:String}, url:{type:String}},
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    favoriteId: { type: mongoose.Schema.Types.ObjectId, ref: "Favorite" },
    newMessages: {
      type: Object,
      default: {}
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    status: {
      type: String,
      default: 'offline'
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    diaries:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'DiaryDetails',
    }],
},{minimize:false},{ timestaps: true });

UserSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}


UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({email});
  if(!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error('Invalid email or password')
  return user
}

const User = mongoose.model("User", UserSchema);
module.exports = User;