import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./blogviewstyle.css";
import sampledp from "../../assets/images/introageimage.jpg";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import dp from "../../assets/images/dp.jpg";
import Footer from "../components/footer";
import baseUrl from "../../api/serverAPI";

const SinglePost = () => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [commentIsUploading, setCommentIsUploading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  //check if the above user has the post id in bookmars array and set state accordingly
  const [isBookmarked, setIsBookmarked] = useState(false);

  var count = 0;
  // var imageUrl = '';
  const [imageUrl, setImageUrl] = useState(
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
  );
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [morePosts, setMorePosts] = useState([]);
  const createdAt = new Date(posts.createdAt);
  const [userImage, setUserImage] = useState("");
  const indianTimeZone = "Asia/Kolkata"; // Indian Standard Time (IST) time zone

  const formattedDate = createdAt.toLocaleString("en-US", {
    timeZone: indianTimeZone, // Set the Indian time zone
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };
  const handleAddComment = async (ev) => {
    ev.preventDefault();
    setCommentIsUploading(true);
    if (commentText.length === 0) {
      return;
    }
    try {
      console.log("In handle add comment");
      const res = await axios.post(`${baseUrl}/addComment`, {
        postId: id,
        userId: user._id,
        userName: user.name,
        commentId: posts.commentsId,
        userImage: user.image.url
          ? user.image.url
          : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
        text: commentText,
      });
      console.log("Add Comment response", res);
      toast.success("Comment Added");
      setComments([...comments, res.data.comment]);
      //sort comments based on createdAt
      setComments(
        comments.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );

      setCommentText("");
    } catch (err) {
      console.log(err);
      toast.error("Error in adding comment");
    } finally {
      setCommentIsUploading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const targetUserId = posts.userId;
      const res = await axios.get(
        `${baseUrl}targetUserPosts/${targetUserId}`
      );
      setMorePosts(res.data.posts.slice(0, 6));
      // console.log("More Posts", res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/getSinglePost/${id}`
        );
        setUserImage(res.data.userDp);
        setPosts(res.data.post);
        console.log("Post", res.data.post);
        setImageUrl(res.data.post.titleImage[0].url);
        setIsBookmarked(user.bookmarks.includes(id));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        // Display an alert message and redirect to the previous page
        alert(
          "Failed to fetch the post. Redirecting to the explore to see more posts."
        );
        window.location.href = "/explore";
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
    fetchUserPosts();
  }, [posts]);

  useEffect(() => {
    setCommentLoading(true);
    const fetchComments = async () => {
      try {
        console.log("In fetch likes & comments");
        const commentRes = await axios.get(
          `${baseUrl}/getPostComments/${id}`
        );
        const LikesRes = await axios.get(
          `${baseUrl}/getPostLikes/${id}`
        );
        setComments(commentRes.data.comments);

        //console.log("Comments", comments)
        setLikes(LikesRes.data.likes);
        //console.log("Likes", likes)
        setCommentLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setCommentLoading(false);
      }
    };
    fetchComments();
    const commentInterval = setInterval(() => {
      fetchComments();
    }, 5000);

    return () => {
      clearInterval(commentInterval);
    };
  }, []);

  const htmlContent = posts.content;
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlContent;
  // console.log("here",posts)

  const handleLike = async (ev) => {
    while (commentLoading) {
      console.log("Waiting for fetchComments to end");
    }
    console.log("In handle like");
    console.log(likes.includes(user._id));
    if (likes.includes(user._id)) {
      try {
        const res = await axios.post(`${baseUrl}/unlikePost`, {
          postId: id,
          userId: user._id,
        });
        console.log("Like Post response", res);
        toast.success("Removed Like");
        setLikes(likes.filter((userId) => userId !== user._id));
      } catch (err) {
        console.log(err);
        toast.error("Error in removing liking");
      }
    } else {
      try {
        const res = await axios.post(`${baseUrl}/likePost`, {
          postId: id,
          userId: user._id,
        });
        console.log("Like Post response", res);
        toast.success("Liked Post");
        setLikes([...likes, user._id]);
      } catch (err) {
        console.log(err);
        toast.error("Error in liking post");
      }
    }
    console.log("End of handle like");
  };

  const handleBookmark = async (ev) => {
    // while(commentLoading){
    //   console.log("Waiting for fetchComments to end");
    // }
    console.log("In handle bookmark");
    if (user.bookmarks.includes(id)) {
      try {
        console.log("Removing bookmark");
        const res = await axios.post(`${baseUrl}/unbookmarkPost`, {
          postId: id,
          userId: user._id,
        });
        console.log("Bookmark Post response", res);
        toast.success("Removed Bookmark");
        user.bookmarks = user.bookmarks.filter((postId) => postId !== id);
        setIsBookmarked(false);
        console.log("User", user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.log(err);
        toast.error("Error in removing bookmark");
      }
    } else {
      try {
        console.log("Adding bookmark");
        const res = await axios.post(`${baseUrl}/bookmarkPost`, {
          postId: id,
          userId: user._id,
        });
        console.log("Bookmark Post response", res);
        toast.success("Bookmarked Post");
        user.bookmarks.push(id);
        console.log("User", user);
        setIsBookmarked(true);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.log(err);
        toast.error("Error in bookmarking post");
      }
    }
  };

  return (
    <html>
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
          <head>
            <title>BlogView</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width" />
            <link rel="stylesheet" href="blogviewstyle.css" />
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
            />
          </head>

          <body className="blogbackground1">
            <Navbar />
            <div className="container container222">
              {isLoading ? (
                <div className="container marketing">
                  <p>Loading Post...</p>
                </div>
              ) : (
                <div className="container mt-4">
                  <div className="row">
                    <div className="col-lg-8">
                      <h1 className="blog-title1 postTitleFormat">
                        <strong>{posts.title}</strong>
                      </h1>
                      <p className="blog-summary1">{posts.summary}</p>
                      <div className="author-info1">
                        <img
                          src={userImage.url ? userImage.url : dp}
                          alt="Author's Profile Picture"
                          className="profile-pic1 rounded-circle1"
                        />
                        <div className="author-details1">
                          <div className="user-info1">
                            <a
                              className="author-link1 ffffffffamily"
                              href="/@claytonmoulynox?source=post_page-----c6ee368114f7--------------------------------"
                            >
                              {posts.author}
                            </a>
                          </div>
                          <div className="author-meta">
                            <span
                              className="publish-date1 ffffffffamily"
                              data-testid="storyPublishDate"
                            >
                              {formattedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="blog-actions">
                        {likes.includes(user._id) ? (
                          <button class="btn btn-light " onClick={handleLike}>
                            <i className="fas fa-heart ffffffffamily"></i>{" "}
                            Dislike
                          </button>
                        ) : (
                          <button class="btn btn-light " onClick={handleLike}>
                            <i className="far fa-heart ffffffffamily"></i> Like
                          </button>
                        )}
                        {isBookmarked ? (
                          <button
                            class="btn btn-light"
                            onClick={handleBookmark}
                          >
                            <i className="fas fa-bookmark ffffffffamily"></i>{" "}
                            Remove Bookmark
                          </button>
                        ) : (
                          <button
                            class="btn btn-light"
                            onClick={handleBookmark}
                          >
                            <i className="far fa-bookmark ffffffffamily"></i>{" "}
                            Bookmark
                          </button>
                        )}
                      </div>
                      {/* <div>{`${likes}`} likes</div> */}
                      {likes.length === 1 ? (
                        <div>1 user likes this.</div>
                      ) : (
                        <div
                          style={{
                            color: "#909090",
                            fontFamily: "Helvetica",
                            fontSize: "18px",
                            fontWeight: "normal",
                            flexBasis: "30%",
                          }}
                        >
                          {`${likes.length} users liked this`}
                        </div>
                      )}

                      <div>
                        <img
                          src={
                            imageUrl
                              ? imageUrl
                              : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                          }
                          alt="Blog Image"
                          className="img-fluid mt-3 centerimagggggg"
                          width={"500vh"}
                          height={"500vh"}
                        />
                      </div>
                      <br></br>
                      <div className="blog-content1">
                        <br></br>
                        <div
                          dangerouslySetInnerHTML={{ __html: posts.content }}
                          className="content1"
                        />
                      </div>
                      <div>
                        <hr></hr>
                        <div style={{ border: "black" }}>
                          <form className="mb-4">
                            <textarea
                              className="f1 paddingcomment"
                              rows="4"
                              value={commentText}
                              onChange={handleCommentChange}
                              placeholder="Join the discussion and leave a comment!"
                            ></textarea>
                            {/* <button
                              className="btn btn-secondary"
                              onClick={handleAddComment}
                              style={{ borderRadius: "5rem", float: "right" }}
                            >
                              Add Comment
                            </button> */}
                            <button
                              className="btn btn-secondary"
                              onClick={handleAddComment}
                              style={{ borderRadius: "5rem", float: "right" }}
                              disabled={commentIsUploading}
                            >
                              {commentIsUploading ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              ) : (
                                "Add Comment"
                              )}
                            </button>
                          </form>
                          <div>
                            {comments.length === 0 ? (
                              <div>No comments yet</div>
                            ) : null}

                            {comments.map((comment, index) => (
                              <div key={index} className="d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    className="rounded-circle"
                                    src={comment.userImage}
                                    alt="User Profile"
                                    width="50"
                                    height="50"
                                  />
                                </div>
                                <div className="ms-3">
                                  <div className="fw-bold">
                                    {comment.userName}
                                  </div>
                                  <div>{comment.text}</div>
                                  <div className="timestamp-light-grey">
                                    {comment.createdAt}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="hashtags mb-4">
                        <h3>Hashtags</h3>
                        <ul>
                          {posts.tags && posts.tags.length > 0 ? (
                            posts.tags.map((tag) => (
                              <>
                                <li>
                                  <a
                                    href={`/seemore/${tag}`}
                                    style={{ color: "black" }}
                                  >
                                    {tag}
                                  </a>
                                </li>
                                <div>
                                  Click on the tag to see more related posts
                                </div>
                              </>
                            ))
                          ) : (
                            <div>No tags for this blog</div>
                          )}
                        </ul>
                      </div>
                      <br></br>
                      <br></br>
                      <br></br>
                      <div className="more-blogs">
                        <h3>More Blogs from this user</h3>
                        <div className="more-blogs-container">
                          <div className="scrollable-blogs">
                            {morePosts.map(
                              (post) =>
                                post._id !== id && (
                                  <div className="card" key={post.id}>
                                    <div className="row g-0">
                                      <div
                                        className="col-md-4"
                                        style={{ alignSelf: "center" }}
                                      >
                                        <img
                                          style={{
                                            justifyContent: "space-evenly",
                                          }}
                                          src={
                                            post.imageUrl
                                              ? post.imageUrl
                                              : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                                          }
                                          className="img-fluid"
                                          alt={post.title}
                                        />
                                      </div>

                                      <div className="col-md-8">
                                        <div className="card-body">
                                          <div>
                                            {post.title.slice(0, 60)}
                                            {post.title.length > 60 && "..."}
                                          </div>

                                          {/* <p className="card-text">
                                            {post.summary.slice(0, 5)}
                                          </p> */}
                                          <a
                                            href={`/getSinglePost/${post._id}`}
                                            className="btn btn-light"
                                          >
                                            Read More
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </body>
          <Footer />
        </>
      )}
    </html>
  );
};
export default SinglePost;
