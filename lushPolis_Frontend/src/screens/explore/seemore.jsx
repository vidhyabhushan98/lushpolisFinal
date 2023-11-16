import React from "react";
import "./explore.css";
import Navbar from "../components/Navbar.jsx";
// import Head from "./top5blogs.jsx"; 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api/serverAPI';

const BlogCard = ({ post }) => {
  const getSinglePost = '/getsinglePost/';
  return (
    <>
      <div className="card" style={{ border: 'none' }}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <a href={getSinglePost + post._id} style={{ textDecoration: "none" }}>
                <h5 className="card-title" style={{ color: 'green' }}>{post.title}</h5>
                <p className="card-text" style={{ color: 'green' }}>{post.summary} </p>
                <p style={{ color: 'green' }}>by {post.author}</p>

              </a>
            </div>
            <div className="card-footer" style={{ border: 'none' }}>
              {/* <button className="icon-button" style={{ border: 'none' }}><i className="far fa-bookmark"></i></button>
              <button className="icon-button" style={{ border: 'none' }}><i className="far fa-heart"></i></button>
              <button className="icon-button" style={{ border: 'none' }}><i className="far fa-comment"></i></button> */}
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
          <img src={post.titleImage[0].url? post.titleImage[0].url : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='} className="card-img bimg" alt="Cat" />
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};


const Seemore = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tag } = useParams();
  console.log(tag);

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await axios.post(`${baseUrl}/getTagPosts/${tag}`);
        setPosts(res.data.posts);
        setIsLoading(false);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
    console.log(posts)
  }, []);


  return (
    <>
      <html><head>
        <title>Explore page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="width=device-width" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js" integrity="sha512-jEnuDt6jfecCjthQAJ+ed0MTVA++5ZKmlUcmDGBv2vUI/REn6FuIdixLNnQT+vKusE2hhTk2is3cFvv5wA+Sgg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

      </head>
        <body>
          <Navbar />
          <div className="container marketing padno">
          {isLoading ? <>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Loading Indicator */}
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
        </>
        :
            <>
            <h1>Showing {tag} related posts </h1>
            <div className="row">
              {posts.length > 0 ? (
                <React.Fragment>
                  {posts.map((post, index) => {
                    if (index % 2 === 0) {
                      // Start a new row on even index
                      return (
                        <div className="col-md-6" key={post._id}>
                          <BlogCard post={post} />
                        </div>
                      );
                    }
                    return null; // Return null for odd indexes
                  })}
                  {posts.map((post, index) => {
                    if (index % 2 !== 0) {
                      // Continue the row on odd index
                      return (
                        <div className="col-md-6" key={post._id}>
                          <BlogCard post={post} />
                        </div>
                      );
                    }
                    return null; // Return null for even indexes
                  })}
                </React.Fragment>
              ) : (
                <div>No posts available.</div>
              )}

            </div>
            </> 
            }                
          </div>

        </body></html>
    </>
  );
};

export default Seemore;