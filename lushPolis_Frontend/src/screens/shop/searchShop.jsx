import "./shop.scss";
import { useState, useEffect } from "react";
import { ShopOptions } from "./shopOptions";
import { ShopProducts } from "./shopProducts";
import axios from "axios";
import Navbar from "../components/Navbar";
import MiddleHeader from "./MiddleHeader";
import { Spinner } from "../components/spinner/Spinner";
import { useParams } from "react-router-dom";
import baseUrl from "../../api/serverAPI";

const SearchShop = () => {
    const [productsDATA, setProductsDATA] = useState([]);
    const [visible, setVisible] = useState(null);
    const [filterItem, setFilterItem] = useState("");
    const [priceSorted, setPriceSorted] = useState("");
    const [sortingOption, setSortingOption] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const {query} = useParams();

    async function fetchProducts() {
        try {
          
          console.log("shop search query", query);
          const res = await axios.post(`${baseUrl}/searchProducts`,{query});
          const data = (res.data.products);
          console.log("all products",data);
          console.log("type of products", typeof data)
          setProductsDATA(data);
        } catch (error) {
          console.log(error);
        }
      }

    async function fectchCart() {
        try {
          const res = await axios.post(`${baseUrl}/fetchCart`, {cartId: user.cartId});
          const data = (res.data.cart);
        } catch (error) {
          console.log(error);
        }
      }
    
    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fectchCart();
        setLoading(false);
    }, [query]);

    const filterdProducts = productsDATA.filter((product) =>
      filterItem === "plants"
        ? product.category === "Plants"
        : filterItem === "gardeningTools"
        ? product.category === "Gardening Tools"
        : filterItem === "fertilisers"
        ? product.category === "Fertilisers"
        : true
    );

    const sortedPrices =
    priceSorted === "Lth"
      ? filterdProducts.sort((a, b) => a.price - b.price)
      : priceSorted === "Htl"
      ? filterdProducts.sort((a, b) => b.price - a.price)
      : filterdProducts;

  
  let sortedProducts = filterdProducts;

  if (sortingOption === "Mp") {
    sortedProducts = sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
  } else if (sortingOption === "Mr") {
    sortedProducts = sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  
  return (
    <>
    <Navbar></Navbar>
   
      <div className="shop container marketing">
      {isLoading ? <Spinner/> : <>
      <MiddleHeader cartItems={cartItems} />
        <div className="container">
          <h1 className="title">Shop</h1>
          <div className="shop-wrapper">
            <ShopOptions
              filterdProducts={filterdProducts}
              setPriceSorted={setPriceSorted}
              setFilterItem={setFilterItem}
              setSortingOption={setSortingOption}
            />
            <ShopProducts
              filterdProducts={sortedPrices}
              visible={visible}
              setVisible={setVisible}
            />
          </div>
        </div>
        </>
        }
      </div>
    </>
  );


}

export default SearchShop;
