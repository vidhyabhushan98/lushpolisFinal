import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import { useInView } from "react-intersection-observer";
import baseUrl from "../../api/serverAPI";

const BlogCard = ({ post, key }) => {
  //console.log(post.title, post._id)
  const getSinglePost = "/getsinglePost/";

  return (
    <>
      <div className="card" style={{ border: "none" }}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <a
              href={getSinglePost + post._id}
              style={{ textDecoration: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ color: "green" }}>
                  {post.title}
                </h5>
                <p className="card-text" style={{ color: "green" }}>
                  {post.summary}
                </p>
              </div>
            </a>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={
                post.titleImage[0].url
                  ? post.titleImage[0].url
                  : "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4="
              }
              className=" bimg"
              alt="Cat"
            />
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

const Following = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const [ref, inView] = useInView();

  const loadMorePosts = async () => {
    try {
      if (!isLoading && inView) {
        console.log("in load more posts", page);
        setIsLoading(true);
        //console.log(user);
        const res = await axios.post(
          `${baseUrl}/getBetterFollowingPosts`,
          { user: user, page2: page }
        );
        //console.log(res.data.posts);
        setPosts((prev) => [...prev, ...res.data.posts]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("in use effect");
    loadMorePosts();
  }, [inView]);

  return (
    <>
      <NavBar />
      <div className="container marketing">
        <h1 style={{ color: "black", textAlign: "center" }}
        >Following Posts</h1>
        <>
        <br/>
          {posts?.length > 0 ? (
            posts.map((post) => <BlogCard post={post} key={post._id} />)
          ) : (
            <div>No posts available.</div>
          )}
        </>
        {/* )}    */}
      </div>
      <div ref={ref}></div>
      {isLoading && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "5vh",
            }}
          > 
           
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
          </div>
          
        </>
      )}
      <Footer />
    </>
  );
};

export default Following;
