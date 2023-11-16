import React from 'react'
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './blogsdisplay.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import baseUrl from '../../api/serverAPI';

import axios from 'axios';
const BlogCard = ({ post, onDelete, key }) => {
  console.log(post.title, post._id)
  const [isdelete, setDelete] = useState(false);
  const getSinglePost = '/getsinglePost/';
  const user = JSON.parse(localStorage.getItem('user'));
  const [isDeleting, setIsDeleting] = useState(false); 
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    setDelete(true);
  }

  const handleCancel = async () => {
    setDelete(false);
  }

  const handleDeleteReally = async () => {
    try {
      setIsDeleting(true);
      console.log("Deleting post");
      const response = await axios.post(`${baseUrl}/deletePost`, {postId: post._id, userId: post.userId });
      if (response.status === 200) {
        onDelete(post._id);
      }  
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
      setDelete(false);
    }
  };

  const handleEdit = async () => {
    navigate('/editPost/'+post._id);
  };  


  return (
    <>
      <div className="card" style={{ border: 'none' }}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <a href={getSinglePost + post._id} style={{ textDecoration: "none" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "green" }}>{post.title}</h5>
                <p className="card-text" style={{ color: "green" }}>{post.summary}</p>
              </div>
            </a>
            {/* <div className="card-footer" style={{ border: 'none' }}>
              <button className="icon-button" style={{ border: 'none' }}><i className="far fa-bookmark"></i></button>
              <button className="icon-button" style={{ border: 'none' }}><i className="far fa-heart"></i></button>
              <button className="icon-button" style={{ border: 'none' }}><i className="far fa-comment"></i></button>
              
            </div> */}
          </div>
          
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
            <img src={post.titleImage[0].url ? post.titleImage[0].url : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="card-img bimg" alt="Cat" />
            {post.userId === user._id ? (
              !isdelete ? (
                <>
                <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleDelete}>
                  <i className="far fa-trash-alt"></i>
                </button>
                <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleEdit}>
                      <i className="far fa-edit"></i>
                    </button>
                </>
              ) : (
                <>
                  <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleCancel}>
                    <i className="far fa-times-circle"></i>
                  </button>
                  <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleDeleteReally}>
                    {isDeleting ? <div className="loading-indicator">Loading...</div> : <i className="far fa-check-circle"></i>}
                  </button>
                </>
              )
            ) : (
              <></>
            )
            }
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

const BlogsList = () => {

  const {id} = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/targetUserPosts/${id}`);
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

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard post={post} onDelete={handleDeletePost} key={post._id} />
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </>
      )}
    </>
  );
}


export default BlogsList;

