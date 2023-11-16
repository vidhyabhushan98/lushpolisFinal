//import { removeFromWISH_List } from "../../redux/slices/favSlice";
import "./favorite.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import MiddleHeader from "../MiddleHeader";
import baseUrl from "../../../api/serverAPI";

const Favorite = () => {
  //const { WISH_LIST_ITEMS } = useSelector((state) => state.wishlist);
  const [isLoading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [WISH_LIST_ITEMS, setWishList] = useState([]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      console.log("user id in cart", user.cartId);
      const res = await axios.post(`${baseUrl}/fetchCart`,{cartId : user.cartId} );
      const data = (res.data.cart);
      console.log("cart items",data)
      // console.log("all products",data);
      // console.log("type of products", typeof data)
      setCartItems(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const fetchWishListItems = async () => {
    try {
      console.log("user id in favorite", user.favoriteId);
      const res = await axios.post(`${baseUrl}/fetchFavorite`,{favoriteId : user.favoriteId} );
      const data = (res.data.favorite);
      console.log("favourite items",data)
      // console.log("all products",data);
      // console.log("type of products", typeof data)
      setWishList(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }

  const handleDeletefromFavs = async (id) => {
    try{
      console.log("removing item from favs", id);
      const res = await axios.post(`${baseUrl}/removeFromFavorite`,{user : user, productId: id} );
      setWishList(WISH_LIST_ITEMS.filter(product => product._id !== id));
    }
    catch (error) {
      console.log(error.toString());
    }
  }


  useEffect(() => {
    fetchCartItems();
    fetchWishListItems();
  }, []);


  return (
    <>
    <NavBar/>
      <div className="wishlist">
        <div className="container marketing">
          <MiddleHeader cartItems={cartItems} />
          {!isLoading ? (<>
          <h1 className="title">Wishlist</h1>
          <div className="items-wrapper">
            {WISH_LIST_ITEMS && WISH_LIST_ITEMS.length > 0 ? (
              <>
                <table className="wish-box-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {WISH_LIST_ITEMS.map((item) => (
                      <tr key={item.id} className="wish-box">
                        <td className="img-status">
                          <img src={item.image} alt={item.title} />
                          <span>{item.title}</span>
                        </td>
                        <td className="price">${item.price}</td>
                        <td className="avil"><>{item.description}
                        <br></br>
                        <a href={`/shop/${item.product}`} className="btn btn-primary" style={{backgroundColor:"green"}}>
                          <button style={{backgroundColor:"green"}}>Click here to check availability</button>
                        </a></></td>
                        
                        <td className="del">
                          <button onClick={() =>handleDeletefromFavs(item._id)} style={{ cursor: "pointer" }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div>
                <p style={{ height: "38px" }}>Currently your wishlist is empty</p>
              </div>
            )}
          </div>
          </>) : <p>Loading</p>}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Favorite;  
