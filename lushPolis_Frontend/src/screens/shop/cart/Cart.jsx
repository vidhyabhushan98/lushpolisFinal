import "./cart.scss";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import MiddleHeader from "../MiddleHeader";
import baseUrl from "../../../api/serverAPI";

const Cart = () => {
  const [cartItems, setCartItems] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const shop = "/shop/";

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      console.log("user id in cart", user.cartId);
      const res = await axios.post(`${baseUrl}/fetchCart`, {
        cartId: user.cartId,
      });
      const data = res.data.cart;
      console.log("cart items", data);
      // console.log("all products",data);
      // console.log("type of products", typeof data)
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckOut = async () => {
    try {
      console.log("checking out");
      const res = await axios.post(`${baseUrl}/buyProduct`, {user:user});
      console.log(res.data);
      if(res.data.error === "Some products are not available."){
        alert("Some products are not available. Please check availablity of products in your cart.");
      }
      else{
        const data = res.data.cart;
        console.log("cart items", data);
        alert("Your order has been placed successfully.");
        setCartItems(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleDeletefromCart = async (id, event) => {
    try {
      console.log("removing item from cart", id);
      const res = await axios.post(`${baseUrl}/removeFromCart`, {
        userId: user._id,
        productId: id,
      });
      const data = res.data.cart;
      console.log("deleted items", data);
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        products: prevCartItems.products.filter(
          (product) => product.product !== id
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="cart">
        <div className="container marketing">
          <MiddleHeader cartItems={cartItems} />
          <h1 className="title">Your Cart</h1>
          <div className="cart-holder">
            <div className="cart-wrapper">
              {cartItems &&
              cartItems.products &&
              cartItems.products.length == 0 ? (
                <div>Your Cart is Empty :(</div>
              ) : (
                <>
                  {cartItems &&
                    cartItems.products &&
                    cartItems.products.map((item) => (
                      <>
                       
                        <div className="cart-details" key={item.id}>
                        <a href={shop+item.product}>
                          <div className="text-cart-box">
                            <div className="info-box">
                              <div className="pic">
                                <img src={item.image} alt="" />
                              </div>

                              <div className="info">
                                <h4>{item.title}</h4>
                                <p>
                                  ${item.price.toFixed(2)}{" "}
                                  {/* <del>
                                  $(
                                  {(item.price * item.quantity * 1.2).toFixed(2)})
                                </del> */}
                                </p>
                              </div>
                            </div>
                            <div className="add-delete">
                              <div className="delete">
                                <BiSolidTrashAlt
                                  className="icon"
                                  onClick={() =>
                                    handleDeletefromCart(item.product)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          </a>
                        </div>
                        
                        <hr />
                      </>
                    ))}
                </>
              )}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="cart-sum-box">
                <div>
                  Subtotal:{" "}
                  <span>
                    {cartItems && cartItems.products
                      .reduce((total, product) => {
                        const itemPrice = product.price; // Replace 'price' with the actual price property name
                        const quantity = product.quantity; // Replace 'quantity' with the actual quantity property name

                        // Calculate the subtotal for each product and add it to the total
                        return total + itemPrice * quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div>
                  Shipping: <span>Free</span>
                </div>
                <hr />

                <div>
                  Total:{" "}
                  <span>
                    {cartItems && cartItems.products
                      .reduce((total, product) => {
                        const itemPrice = product.price; // Replace 'price' with the actual price property name
                        const quantity = product.quantity; // Replace 'quantity' with the actual quantity property name

                        // Calculate the subtotal for each product and add it to the total
                        return total + itemPrice * quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <button
                  className="btn btn-primary"
                  color="primary"
                  onClick={handleCheckOut}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
