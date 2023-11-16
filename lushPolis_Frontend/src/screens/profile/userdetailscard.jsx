import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import msgn from "../../assets/images/messengericon.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from "axios";
import ProfilePage from "./profilepage";
import baseUrl from "../../api/serverAPI";
import dp from "../../assets/images/dp.jpg";
import FollowingList from "./followinglist";



const userDetailscard = ({ user, setUser, setActiveItem }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isFollowing, setIsFollowing] = React.useState(false);
  const { id } = useParams();
  const [imageUpload, setImageUpload] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [peopleData, setPeopleData] = useState([]);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio ? user?.bio : "");
  const [isUpdatingBio, setIsUpdatingBio] = useState(false);
  let newImage2 = "";
  
  const handleImageIconClick = () => {
    setShowPrompt(true);
  };

  const fetchPeople = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/getFollowing/${user._id}`
      );
      setPeopleData(res.data.following);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFollowingLoading(false);
    }
  };

  const handlePromptResponse = async (action) => {
    if (action === "remove") {
      try {
        setImageUpload(true);
        const res = await axios.post(`${baseUrl}/removeProfilePic`, {
          userId: currentUser._id,
        });
        console.log(res.data);
        setUser((prevState) => ({
          ...prevState,
          user: res.data.user,
        }));
        //reload page
        //window.location.reload();
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error(err);
      } finally {
        setImageUpload(false);
      }
    } else if (action === "add") {
      console.log("in add profile picture");
      await openImageUploader();
      if (newImage2?.length === 0) {
        console.log("No image in newImage", newImage);
        return;
      }
      console.log("updating profile picture");
      try {
        setImageUpload(true);
        const res = await axios.post(
          `${baseUrl}/addProfilePicture`,
          {
            userId: currentUser._id,
            image: newImage2,
          }
        );
        console.log(res.data);
        //window.location.reload();
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser((prevState) => ({
          ...prevState,
          user: res.data.user,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setImageUpload(false);
      }
    }
    setShowPrompt(false);
  };

  const openImageUploader = () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = () => {
          try {
            //console.log(reader.result)
            newImage2 = reader.result;
          } catch (err) {
            console.log(err);
          } finally {
            setNewImage(reader.result);
          }
          resolve();
        };
      };
      input.click();
    });
  };

  const handleFollow = async () => {
    setIsFollowing(true);
    try {
      const res = await axios.post(`${baseUrl}/followUser`, {
        userId: currentUser._id,
        targetId: id,
      });
      currentUser.following.push(id);
      localStorage.setItem("user", JSON.stringify(currentUser));
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
  };


  const handleSaveClick = async () => {
    setIsUpdatingBio(true);
    try{
      const res = await axios.post(`${baseUrl}/updateBio`, {
        userId: currentUser._id,
        bio: editedBio
      });
      console.log(res);
      setUser((prevState) => ({
        ...prevState,
        user: res.data.user,
      }));
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsUpdatingBio(false);
      setIsEditing(false);
    }
  };
  const handleUnFollow = async () => {
    setIsFollowing(true);
    try {
      const res = await axios.post(`${baseUrl}/unfollowUser`, {
        userId: currentUser._id,
        targetId: id,
      });
      currentUser.following.pop(id);
      localStorage.setItem("user", JSON.stringify(currentUser));
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFollowing(false);
    }
  };

  const currentuser = JSON.parse(localStorage.getItem("user"));
  return (
    <div style={{ paddingTop: "2rem" }}>
      <div style={{ position: "relative" }}>
        {imageUpload ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <img
            className="rounded-circle"
            src={user && user.image && user.image.url ? user.image.url : dp}
            alt="Generic placeholder image"
            width="140"
            height="140"
          />
        )}
        {user?._id == currentuser?._id && (
          <>
            <button onClick={handleImageIconClick}>
              <i
                className="fas fa-camera"
                style={{ position: "absolute", bottom: "0" }}
              />
            </button>
            {showPrompt && (
              <div
                style={{
                  position: "absolute",
                  bottom: "50px",
                  right: "0",
                  background: "white",
                }}
              >
                <p style={{ color: "Black", fontWeight: "bold" }}>
                  Do you want to:
                </p>
                <button
                  style={{ color: "grey" }}
                  onClick={() => handlePromptResponse("remove")}
                >
                  Remove Photo?
                </button>
                <br />
                <button
                  style={{ color: "green" }}
                  onClick={() => handlePromptResponse("add")}
                >
                  Add Photo?
                </button>
                <br />
                <button
                  style={{ color: "red" }}
                  onClick={() => setShowPrompt(false)}
                >
                  Cancel X
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <h3> {user && user.name}</h3>
      {/* <p>
        <b>User Profile page is still under construction.</b>
      </p> */}
      {user && user._id == currentuser?._id ? (
        <>
          <br />
          <p>
            <a
              class="btn btn-secondary"
              href="/createPost"
              style={{ borderRadius: "5rem" }}
            >
              Create Post
            </a>
          </p>
          <br />
          {!isEditing ? (
            <>
            { user && user.bio?
            <>
              <p>{user.bio}</p>
              <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleEditClick}>
                <i className="far fa-edit"></i>
              </button>
            </>
            :(
            <>
            <p> "No bio to show here" </p>
            <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleEditClick}>
              <i className="far fa-edit"></i>
            </button>
            </>
            )}
            </>
          ) : (
            <>
            {isUpdatingBio ? <div className="loading-indicator">Loading...</div>:(
            <>
            <textarea
              placeholder="Add your bio here"
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              style={{padding:"10px", height:"100px", width:"100%"}}
            />
            <br/>
             <button className="icon-button" style={{ border: 'none', marginTop: '10px' }} onClick={handleCancelEditClick}>
                    <i className="far fa-times-circle"></i>
              </button>
              
              <button className="icon-button" style={{ border: 'none', marginTop: '10px',paddingLeft:"10px" }} onClick={handleSaveClick} >
                    {isUpdatingBio ? <div className="loading-indicator">Loading...</div> : <i className="far fa-check-circle"></i>}
              </button>
              </>
            )}
            </>
          )}
         
          <br />
          <br/>
          {/* {isEditing ? (
            <div>
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <div>
              {user && user.bio ? (
                <p>{user.bio}</p>
              ) : (
                <p>No bio to show here</p>
              )}
              <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} />
            </div>
          )} */}
          <p>
            <a
              class="btn btn-secondary"
              href="/bookmarks"
              style={{ borderRadius: "5rem" }}
            >
              Bookmarks
            </a>
          </p>
        </>
      ) : (
        <p>
          {user && currentUser.following.includes(user._id) ? (
            <button
              class="btn btn-secondary"
              onClick={handleUnFollow}
              style={{ borderRadius: "5rem" }}
            >
              Unfollow
            </button>
          ) : (
            <button
              class="btn btn-secondary"
              onClick={handleFollow}
              style={{ borderRadius: "5rem" }}
            >
              Follow
            </button>
          )}
          {/* <a href="#" style={{ borderRadius: "50%", marginLeft: "1rem" }}>
            <img src={msgn} style={{ width: "1.5rem" }}></img>
          </a> */}

          {user && user.bio ? (
            <p>{user.bio}</p>
          ) : (
            <p> "No bio to show here" </p>
          )}
        </p>
      )}
      <br></br>
      <FollowingList peopleData={peopleData} setActiveItem={setActiveItem} />
    </div>
  );
};

export default userDetailscard;
