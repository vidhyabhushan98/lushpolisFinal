import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Userdetailscard from './userdetailscard';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import baseUrl from '../../api/serverAPI';
const BlogCard = ({ post, key }) => {
    console.log(post.title, post._id)
    const getSinglePost = '/getsinglePost/';
  
    return (
      <>
        <div className="card" style={{ border: 'none' }}>
          <div className="row no-gutters">
            <div className="col-md-8">
              <a href = {getSinglePost + post._id} style={{textDecoration:"none"}}>
              <div className="card-body">
                <h5 className="card-title" style={{color:"green"}}>{post.title}</h5>
                <p className="card-text" style={{color:"green"}}>{post.summary}</p>
              </div>
              </a>
              <div className="card-footer" style={{ border: 'none' }}>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-bookmark"></i></button>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-heart"></i></button>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-comment"></i></button>
  
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


const Bookmarks = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await axios.post(`${baseUrl}/getBookmarks`, {userId: user._id});
                console.log(res.data.bookmarks)
                setPosts(res.data.bookmarks);
                setIsLoading(false);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                // console.log("in finally",posts);
                setIsLoading(false);
            }
        }
        fetchBookmarks();
    }, []);

    return (
        <>
        <NavBar/>
        <div className="container marketing"> 
        <h1>Bookmarks</h1>
        {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
        ) : (
        <>
          {posts?.length > 0 ? (
            posts.map((post) => (
              <BlogCard post={post} key={post._id} />
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </>
      )}   
        </div>
        <Footer/>
        </>
    )
}

export default Bookmarks;
