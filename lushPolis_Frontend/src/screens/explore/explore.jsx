import React, { useEffect, useState } from "react";
import "./explore.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import sampledp from "../../assets/images/dp.jpg";
import TopBlogs from "./top5blogs.jsx";
import axios from "axios";
import baseUrl from "../../api/serverAPI";

const BlogCard = ({ post }) => {
  const getSinglePost = "/getsinglePost/";
  return (
    <>
      <div className="card" style={{ border: "none" }}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <a
                href={getSinglePost + post._id}
                style={{ textDecoration: "none" }}
              >
                <h5 className="card-title" style={{ color: "green" }}>
                  {post.title}
                </h5>
                <p className="card-text" style={{ color: "green" }}>
                  {post.summary}{" "}
                </p>
                <p style={{ color: "green" }}>by {post.author}</p>
              </a>
            </div>
            <div className="card-footer" style={{ border: "none" }}>
              <button className="icon-button" style={{ border: "none" }}>
                <i className="far fa-bookmark"></i>
              </button>
              <button className="icon-button" style={{ border: "none" }}>
                <i className="far fa-heart"></i>
              </button>
              <button className="icon-button" style={{ border: "none" }}>
                <i className="far fa-comment"></i>
              </button>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={
                post.titleImage[0].url
                  ? post.titleImage[0].url
                  : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
              }
              className="card-img bimg"
              alt="Cat"
            />
            {/* <img src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="card-img bimg" alt="Cat" /> */}
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [moreposts, setmorePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [gardeningPosts, setGardeningPosts] = useState([]);
  const [organicPosts, setOrganicPosts] = useState([]);
  const [plantCarePosts, setPlantCarePosts] = useState([]);
  const [terraceGardening, setTerraceGardening] = useState([]);

  const seemore = "/seemore/";
  const catid1 = "Organic";
  const getSinglePost = "/getSinglePost/";

  const categoryPosts = async () => {
    try {
      let tag = "Organic";
      const res = await axios.post(
        `${baseUrl}/getTrendingTagPosts/${tag}`
      );
      setOrganicPosts(res.data.posts);
      //console.log("organic posts", res.data.posts);
    } catch (err) {
      console.log(err);
    }
    try {
      let tag = "Gardening";
      const res = await axios.post(
        `${baseUrl}/getTrendingTagPosts/${tag}`
      );
      setGardeningPosts(res.data.posts);
      //console.log("gardening posts", res.data.posts);
    } catch (err) {
      console.log(err);
    }
    try {
      let tag = "Plant Care";
      const res = await axios.post(
        `${baseUrl}/getTrendingTagPosts/${tag}`
      );
      setPlantCarePosts(res.data.posts);
      //console.log("plant care posts", res.data.posts);
    } catch (err) {
      console.log(err);
    }
    try {
      let tag = "Terrace Gardening";
      const res = await axios.post(
        `${baseUrl}/getTrendingTagPosts/${tag}`
      );
      setTerraceGardening(res.data.posts);
      //console.log("terrace gardening posts", res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    categoryPosts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getallPosts`);
        // setPosts(res.data.posts);
        // setmorePosts(res.data.posts);
        //sort posts based on proportional to likes count and inverse proportinal to time passed
        //date format is 2023-10-31T18:44:05.846Z
        setPosts(
          res.data.posts.sort((a, b) => {
            return (
              b.likes.length -
              a.likes.length +
              1 /
                (Math.abs(new Date(a.createdAt) - new Date(b.createdAt)) + 1) /
                100000000000
            );
          })
        );
        setmorePosts(
          res.data.posts.sort((a, b) => {
            return (
              b.likes.length -
              a.likes.length +
              1 /
                (Math.abs(new Date(a.createdAt) - new Date(b.createdAt)) + 1) /
                100000000000
            );
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <head>
        <title>Profilepage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="width=device-width" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"
          integrity="sha512-jEnuDt6jfecCjthQAJ+ed0MTVA++5ZKmlUcmDGBv2vUI/REn6FuIdixLNnQT+vKusE2hhTk2is3cFvv5wA+Sgg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossorigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        ></link>
      </head>
      <body>
        <Navbar />
        <div className="container marketing padno">
          {isLoading ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                {/* Loading Indicator */}
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <TopBlogs posts={posts} />
              </div>
              <h3 class="soil-title">Gardening Tools</h3>
              <a href={seemore + "Gardening"}>
                <button type="button" class="btn btn-light see-more-btn">
                  See More
                </button>
              </a>
              <hr />
              <section>
                {gardeningPosts.length > 0 ? ( // Check if there are posts in the array
                  <ul className="horizontal-media-scroller">
                    {gardeningPosts.map((post, index) => (
                      <li key={index}>
                        <a href={getSinglePost + post._id}>
                          <figure>
                            <picture>
                              <img
                                className="section-img"
                                alt={post.title}
                                loading="lazy"
                                src={post?.titleImage[0].url}
                              />
                            </picture>
                            <h6>{post.title}</h6>
                            <p>{post.author}</p>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ width: "20rem", height: "10rem" }}>
                    <p>No posts available</p>
                  </div>
                )}
              </section>
              <br></br>

              <h3 class="soil-title">Plant Care</h3>
              <a href={seemore + "Plant Care"}>
                <button type="button" class="btn btn-light see-more-btn">
                  See More
                </button>
              </a>
              <hr />
              <section>
                {plantCarePosts.length > 0 ? ( // Check if there are posts in the array
                  <ul className="horizontal-media-scroller">
                    {plantCarePosts.map((post, index) => (
                      <li key={index}>
                        <a href={getSinglePost + post._id}>
                          <figure>
                            <picture>
                              <img
                                className="section-img"
                                alt={post.title}
                                loading="lazy"
                                src={post?.titleImage[0].url}
                              />
                            </picture>
                            <h6>{post.title}</h6>
                            <p>{post.author}</p>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ width: "20rem", height: "10rem" }}>
                    <p>No posts available</p>
                  </div>
                )}
              </section>
              <br></br>

              <h3 class="soil-title">Organic</h3>
              <a href={seemore + "Organic"}>
                <button type="button" class="btn btn-light see-more-btn">
                  See More
                </button>
              </a>
              <hr />
              <section>
                {organicPosts.length > 0 ? ( // Check if there are posts in the array
                  <ul className="horizontal-media-scroller">
                    {organicPosts.map((post, index) => (
                      <li key={index}>
                        <a href={getSinglePost + post._id}>
                          <figure>
                            <picture>
                              <img
                                className="section-img"
                                alt={post.title}
                                loading="lazy"
                                src={post?.titleImage[0].url}
                              />
                            </picture>
                            <h6>
                              {post.title.slice(0, 45)}
                              {post.title.length > 45 && "..."}
                            </h6>
                            <p>{post.author}</p>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ width: "20rem", height: "10rem" }}>
                    <p>No posts available</p>
                  </div>
                )}
              </section>
              <br></br>
              <h3 class="soil-title">Terrace Gardening</h3>
              <a href={seemore + "Terrace Gardening"}>
                <button type="button" class="btn btn-light see-more-btn">
                  See More
                </button>
              </a>
              <hr />
              <section>
                {terraceGardening.length > 0 ? ( // Check if there are posts in the array
                  <ul className="horizontal-media-scroller">
                    {terraceGardening.map((post, index) => (
                      <li key={index}>
                        <a href={getSinglePost + post._id}>
                          <figure>
                            <picture>
                              <img
                                className="section-img"
                                alt={post.title}
                                loading="lazy"
                                src={post?.titleImage[0].url}
                              />
                            </picture>
                            <h6>{post.title}</h6>
                            <p>{post.author}</p>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ width: "20rem", height: "10rem" }}>
                    <p>No posts available</p>
                  </div>
                )}
              </section>

              <div id="seeallPosts" className="container marketing padno">
                <br></br>
                <br></br>
                <div className="row">
                  {posts.length > 0 ? (
                    <React.Fragment>
                      {moreposts.map((post, index) => {
                        if (index % 2 === 0) {
                          return (
                            <div className="col-md-6" key={post._id}>
                              <BlogCard post={post} />
                            </div>
                          );
                        }
                        return null;
                      })}
                      {posts.map((post, index) => {
                        if (index % 2 !== 0) {
                          return (
                            <div className="col-md-6" key={post._id}>
                              <BlogCard post={post} />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </React.Fragment>
                  ) : (
                    <div>No posts available.</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
};

export default Explore;
