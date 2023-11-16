import './userlist.css'
import dp from '../../assets/images/dp.jpg'
import React from 'react'
import ReactDOM from 'react-dom/client'

const PersonCard = ({ dp, username, about }) => {
  

    return (
      <div className="person-card">
        <div className="dp">
          <img src={dp} alt="User" />
        </div>
        <div className="info">
          <h4 className="headi">{username}</h4>
          <p className="para">{about}</p>
        </div>
        {/* <button class = "b1 btn btn-secondary " onClick={handleFollow} style={{borderRadius:'5rem'}}>Follow</button> */}
      </div>
    );
  };

const UserList = ({user, key}) =>{
    const profile = '/profile/';

    return (
        <>
        <div>
        <a href = {profile+user._id}>
        <PersonCard
          key={key}
          dp={user.image.url?user.image.url:dp}
          username={user.name}
          about={user.bio}
        />
        </a>
        </div>
        </>
    )
}

export default UserList;