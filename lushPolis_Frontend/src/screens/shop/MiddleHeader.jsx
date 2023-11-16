import { FaLeaf } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { AiTwotoneHeart, AiOutlineShoppingCart, AiOutlinePlus, AiOutlinePlaySquare, AiFillGooglePlusCircle, AiFillPushpin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import ecommerce from "../../assets/images/eccomerce.png";
import {useNavigate} from 'react-router-dom';
import "./head.css";

const MiddleHeader = ({cartItems}) => {
  //const { cartItems } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(search === "") return alert("Please enter a search term.");
    console.log("search", search);
    navigate(`/shop/search/${search}`);
  }

  return (
    <div className="middle-header">
      <div className="container" style={{display:"flex" , justifyContent:"space-between"}}>
        <Link to="/shop" className="logo" style={{display:"flex" , fontSize: '22px',fontWeight: '700',textTransform: 'uppercase'}}>
          <img src={ecommerce} alt="logo" style={{width:"210px", height:"50px"}}/>
        </Link>
        <div className="search-bar" style={{display:"flex" , borderColor:"#ddd"}}>
          <BsSearch className="icon" />
          <input className="sEA" type="search" placeholder="What Product do you need?" value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={handleSearch}/>
          <input className="sEA" type="button" value="Search" onClick={handleSearch}/>
        </div>
        <div className="personal" style={{display:"flex"}}>
          <Link to="/shop/favorites">
            <AiTwotoneHeart className="icon fav" />
          </Link>
          <span>|</span>
          <Link to="/shop/add">
            <AiOutlinePlus className="icon fav" />
          </Link>
          <span>|</span>
          <div className="cart" style={{display:"flex"}}>
            <Link to="/shop/cart">
              <AiOutlineShoppingCart className="icon" />
              <p>Items:</p>
              {cartItems&& cartItems.products&&cartItems.products.length > 0 && <span>{cartItems.products.length}</span>}
            </Link>
            <div className="cart-details" style={{paddingLeft:"1rem"}}>
              <p className="title">Shopping cart:</p>
              
              {cartItems && cartItems.products && cartItems.products.reduce((total, product) => {
                    const itemPrice = product.price; // Replace 'price' with the actual price property name
                    const quantity = product.quantity; // Replace 'quantity' with the actual quantity property name

                    // Calculate the subtotal for each product and add it to the total
                    return total + (itemPrice * quantity);
                  }, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleHeader;