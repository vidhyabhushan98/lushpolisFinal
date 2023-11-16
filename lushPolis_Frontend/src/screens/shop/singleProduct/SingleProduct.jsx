import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactImageMagnify from "react-image-magnify";
import "./single-product.scss";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components/spinner/Spinner";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import axios from "axios";
import MiddleHeader from "../MiddleHeader";
import baseUrl from "../../../api/serverAPI";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [favClicked, setFavClicked] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState({ products: [] });
  const [favItems, setfavItems] = useState({ products: [] });
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState(0);

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 5) {
      setValue(inputValue);
    }
  };

  const submitRating = async () => {
    try {
      const res = await axios.post(`${baseUrl}/addRating`, {
        productId: product._id,
        userId: user._id,
        rating: value,
      });
      const data = res.data;
      console.log("rating data", data.product);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchProduct(productID) {
    try {
      const res = await axios.get(
        `${baseUrl}/getProducts/${productID}`
      );
      const data = res.data.product;
      console.log("single products", data);
      data.quantity = 1;
      setProduct(data);
      const userRating = data.rating.find((item) => item.user === user._id);
      if (userRating) {
        setValue(userRating.rate);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddtoCart() {
    try {
      console.log("user id in cart", user.cartId);
      product.quantity = qty;
      const res = await axios.post(`${baseUrl}/addToCart`, {
        product,
        userId: user._id,
      });
      const data = res.data;
      if (!(res.data.message == "Product already in cart")) {
        const updatedCartItems = {
          ...cartItems,
          products: [...cartItems.products, data.product],
        };
        setCartItems(updatedCartItems);
      } else {
        alert("Product already in cart");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletefromCart = async (id) => {
    try {
      console.log("removing item from cart", id);
      const res = await axios.post(`${baseUrl}/removeFromCart`, {
        userId: user._id,
        productId: id,
      });
      const data = res.data.cart;
      console.log("deleted items", data);
      // console.log("all products",data);
      // console.log("type of products", typeof data)
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

  const fetchWishListItems = async () => {
    try {
      setLoading(true);
      console.log("user id in favorite", user.favoriteId);
      const res = await axios.post(`${baseUrl}/fetchFavorite`, {
        favoriteId: user.favoriteId,
      });
      const data = res.data.favorite;
      console.log("favourite items", data);
      // console.log("all products",data);
      // console.log("type of products", typeof data)
      setfavItems(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleDeletefromFavorite = async (id) => {
    try {
      console.log("removing item from favs", id);
      const res = await axios.post(
        `${baseUrl}/removeFromFavorite2`,
        { user: user, productId: id }
      );
      const updatedFavoriteItems = {
        ...favItems,
        products: favItems.products.filter((product) => product.product !== id),
      };
      setfavItems(updatedFavoriteItems);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleAddtoFavorite() {
    try {
      console.log("user id in favs", user.favoriteId, product);
      const res = await axios.post(`${baseUrl}/addToFavorite`, {
        product,
        userId: user._id,
      });
      const data = res.data;
      console.log("fav items", data);

      if (!(res.data.message === "Product already in favorite")) {
        const updatedFavoriteItems = {
          ...favItems,
          products: [...favItems.products, data.product],
        };
        setfavItems(updatedFavoriteItems);
      } else {
        alert("Product already in WishList");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCart() {
    try {
      const res = await axios.post(`${baseUrl}/fetchCart`, {
        cartId: user.cartId,
      });
      const data = res.data.cart;
      console.log("all cart products", data);
      // console.log("type of products", typeof data)
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProduct(id);
    fetchCart();
    fetchWishListItems();
    setLoading(false);
  }, [id]);

  if (!product) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar />
      <div className="container marketing">
        <MiddleHeader cartItems={cartItems} />
        {!isLoading ? (
          <div className="single-product">
            <div className="img">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.title,
                    isFluidWidth: true,
                    src: product.image[0].url,
                  },
                  largeImage: {
                    src: product.image[0].url,
                    width: 2000,
                    height: 1800,
                  },
                  isHintEnabled: true,
                }}
              />
              {/* <img src={product.image[0].url} alt={product.title}  /> */}
            </div>
            <div className="product-info">
              <h3 className="title">{product.title}</h3>
              <div className="rating">
                <p>
                  <AiFillStar className="icon" />{" "}
                  {product.rating.length > 0
                    ? (
                        product?.rating.reduce(
                          (total, rating) => total + rating.rate,
                          0
                        ) / product.rating.length
                      ).toFixed(2)
                    : "No rating"}
                </p>
                <p>{product.rating.length} review</p>
              </div>
              <div className="pricing">${product.price}</div>
              <p className="desc">{product.description}</p>
              <div className="btns">
                {cartItems?.products?.find(
                  (item) => item.product === product?._id
                ) ? (
                  <>
                    <div className="buy2">
                      <button onClick={() => handleDeletefromCart(product._id)}>
                        Remove From Cart
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="buy">
                      <button onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                    <div className="qty">
                      <button
                        className="controls"
                        onClick={() => qty != 1 && setQty(qty - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={qty}
                        onChange={(e) => {
                          setQty(+e.target.value);
                        }}
                      />
                      <button
                        className="controls"
                        onClick={() => qty != 10 && setQty(qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </>
                )}

                {/* <div className="buy">
              <button
                onClick={
                  handleAddtoCart
                }
              >
                Add to Cart
              </button>
            </div> */}
                {favItems?.products?.find(
                  (item) => item?.product === product?._id
                ) ? (
                  <div
                    className="fav"
                    onClick={() => {
                      console.log("removing item");
                      handleDeletefromFavorite(product?._id);
                    }}
                  >
                    <AiFillHeart className="icon filled" />
                  </div>
                ) : (
                  <div
                    className="fav"
                    onClick={() => {
                      console.log("adding item");
                      handleAddtoFavorite();
                    }}
                  >
                    <AiOutlineHeart className="icon outline" />
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label htmlFor="numberInput">
                    Give your rating on scale of 5:{" "}
                  </label>
                </div>
                <div style={{ padding: "1rem" }}>
                  <input
                    type="number"
                    id="numberInput"
                    value={value}
                    onChange={handleInputChange}
                    min={0}
                    max={5}
                  />
                </div>
              </div>
              <button
                onClick={submitRating}
                className="btn"
                style={{ backgroundColor: "greenyellow" }}
              >
                Submit Rating
              </button>

              <div className="category">
                Category: <span>{product.category}</span>
              </div>
              <div className="category">
                Description: <br />
                <span>{product.description}</span>
              </div>
              <div className="category">
                Avilable Stock: <br />
                <span>{product.itemsCount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
