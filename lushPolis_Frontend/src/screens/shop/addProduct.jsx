import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import "./singleProduct/single-product.scss";
import { useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import "./addProduct.css";
import shopbg from "../../assets/images/shopping.jpg";
import whitebg from "../../assets/images/whitebg.jpg";
import baseUrl from "../../api/serverAPI";

const AddProduct = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const sellerName = user.name;
  const userId = user._id;
  const [title, setTitle] = useState("");
  //const [name, setName] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [itemsCount, setItemsCount] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);

  const [loading, setLoading] = useState(false);

  const categories = ["Gardening Tools", "Fertilisers", "Plants"];

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const submitForm = async (e) => {
    console.log("in submit form");
    if (itemsCount == 0) {
      alert("Please enter a valid item count");
      return;
    }
    e.preventDefault();
    try {
      if (
        !title ||
        !description ||
        !summary ||
        !price ||
        !itemsCount ||
        !category ||
        !image
      ) {
        alert("Please enter all the details");
        return;
      }
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/addProduct`, {
        userId,
        sellerName,
        title,
        description,
        summary,
        price,
        itemsCount,
        category,
        image,
      });
      console.log("data", data);
      if (data.success === true) {
        setTitle("");
        setDescription("");
        setSummary("");
        setPrice("");
        setItemsCount("");
        setCategory("");
        setImage("");
        toast.success("Product created successfully");
      }
      setLoading(false);
      console.log(data);
      navigate("/shop/" + data.productId);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error.toString());
    }
  };

  return (
    <>
      <Navbar />

      {/* <div className="container marketing custom_class">
     <h2 className="signup_title ">CREATE PRODUCT</h2>
        <div className="single-product">
            <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" onSubmit={submitForm}>
            
            <div className="form-outline mb-4">
                <input onChange={(e)=>setTitle(e.target.value)} type="text" id="form4Example1" className="form-control"  value={title}/>
                <label className="form-label" htmlFor="form4Example1">Product Title</label>
            </div>

            
            <div className="form-outline mb-4">
                <textarea  onChange={(e)=>setDescription(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={description}/>
                <label className="form-label" htmlFor="form4Example2">Product Description </label>
            </div>

            
            <div className="form-outline mb-4">
                <textarea  onChange={(e)=>setSummary(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={summary}/>
                <label className="form-label" htmlFor="form4Example2">Product Summary </label>
            </div>
            
            <div className="form-outline mb-4">
                <input  onChange={(e)=>setPrice(e.target.value)}  type="number" id="numericInput" className="form-control"   value={price}/>
                <label className="form-label" htmlFor="form4Example2">Price </label>
            </div>

            <div className="form-outline mb-4">
            <label for="cars">Choose a item count:</label>
            <input  onChange={(e)=>setItemsCount(e.target.value)}  type="number" id="numericInput" className="form-control"   value={itemsCount}/>
                <label className="form-label" htmlFor="form4Example2">Price </label>
            </div>

            <div className="form-outline mb-1">
                <select  onChange={(e)=>setCategory(e.target.value)}   id="category" name="cars" className="form-control select select-initialized"  value={category}>
                    <option value="" >Choose Category</option>
                    {
                        categories && categories.map(cat =>(
                            <option>{cat}</option>
                        ))
                    }
                
                </select>
            </div>


            <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>
            <img className="img-fluid" src={image} alt="" />
           
             {!loading ? (
                <button className="btn btn-primary11 btn-block mb-4" type="submit" disabled={loading}>
                    Add Product
                </button>
                ) : (
                <div>
                    Please Wait. Product is Uploading</div>
                )}
         </form>
         </div>
    </div>  */}
      <div style={{ backgroundImage: `url(${shopbg})`, backgroundSize: "" }}>
        <div className="container marketing custom_class" >
          <div className="product-form" style={{ backgroundImage: `url(${whitebg})`}}>
            <h2>Add a Gardening Product</h2>
            <div className="form-content">
              <form onSubmit={submitForm} style={{ display: "flex" }}>
                <div className="form-left">
                  <div className="form-group">
                    <label htmlFor="productTitle">Product Title:</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      id="form4Example1"
                      className="form-control"
                      value={title}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Product Image:</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </div>

                  {image != "" && (
                    <div className="image-preview">
                      <img src={image} alt="Product Image" />
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="itemCount">Item Count:</label>
                    <input
                      onChange={(e) => setItemsCount(e.target.value)}
                      type="number"
                      id="numericInput"
                      className="form-control"
                      value={itemsCount}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      id="numericInput"
                      className="form-control"
                      value={price}
                    />
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      id="category"
                      name="cars"
                      className="form-control select select-initialized "
                      value={category}
                    >
                      <option value="">Choose Category</option>
                      {categories &&
                        categories.map((cat) => <option>{cat}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      id="form4Example2"
                      className="form-control textarea2"
                      value={description}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                      onChange={(e) => setSummary(e.target.value)}
                      type="text"
                      id="form4Example2"
                      className="form-control textarea2"
                      value={summary}
                    />
                  </div>
                </div>
              </form>
            </div>
            {!loading ? (
              <button
                type="submit"
                className="add-product-button"
                onClick={submitForm}
              >
                Add Product
              </button>
            ) : (
              <p>Product is Uploading. Please Wait</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
