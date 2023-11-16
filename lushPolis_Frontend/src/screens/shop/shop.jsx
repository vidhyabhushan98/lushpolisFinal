import "./shop.scss";
import { useState, useEffect } from "react";
import { ShopOptions } from "./shopOptions";
import { ShopProducts } from "./shopProducts";
import axios from "axios";
import Navbar from "../components/Navbar";
import MiddleHeader from "./MiddleHeader";
import { Spinner } from "../components/spinner/Spinner";
import Footer from "../components/footer";
import ecompic from "../../assets/images/ecommerceinto.jpg";
import '../auth/intropage.css';
import baseUrl from "../../api/serverAPI";

const Shop = () => {
    const [productsDATA, setProductsDATA] = useState([]);
    const [visible, setVisible] = useState(null);
    const [filterItem, setFilterItem] = useState("");
    const [priceSorted, setPriceSorted] = useState("");
    const [sortingOption, setSortingOption] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    async function fetchProducts() {
        try {
          const res = await axios.get(`${baseUrl}/getProducts`);
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
          // console.log("all products",data);
          // console.log("type of products", typeof data)
          setCartItems(data);
        } catch (error) {
          console.log(error);
        }
      }
    
    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fectchCart();
        setLoading(false);
    }, []);

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

  if (sortingOption === "Mr") {
    sortedProducts = sortedProducts.sort((a, b) => {
      const avgRatingA = a.rating.length > 0
        ? a.rating.reduce((acc, item) => acc + item.rate, 0) / a.rating.length
        : 0;
        
      const avgRatingB = b.rating.length > 0
        ? b.rating.reduce((acc, item) => acc + item.rate, 0) / b.rating.length
        : 0;
  
      return avgRatingB - avgRatingA;
    });
  } else if (sortingOption === "Mp") {
    sortedProducts = sortedProducts.sort((a, b) => b.rating.length - a.rating.length);
  }
  

  
  return (
    <>
    <Navbar></Navbar>
      <div className="shop container marketing"> 
      {isLoading ? <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       {/* Loading Indicator */}
       <div className="spinner-border text-primary" role="status">
           <span className="visually-hidden">Loading...</span>
       </div>
       </div>
       </> 
      : <>
      <MiddleHeader cartItems={cartItems} />
        <div className="container">
    
        <div className="container-fluid row flex-column flex-md-row align-items-center Header_header__0EKlr" id="ma">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="Header_content__ZU2l5  d-flex flex-column justify-content-around align-items-md-start align-items-center ">
                    <h1 className="Header_heading__CDDLz"><i>LushPolis E-Commerce</i></h1>
                    <p className="Header_description__HXj7d ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center px-5 p-0 undefined">
            <img src={ecompic} width="100%" height="50%" className="Header_headerPic__7K7sR"/>
            </div>
            
        <h4><i>Do your shopping here....</i></h4>  
        </div>      
          <br></br>
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <Footer></Footer>
    </>
  );


}

export default Shop;
