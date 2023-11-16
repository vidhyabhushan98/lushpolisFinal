import React from 'react';
import './peoplelist.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import axios from 'axios';
import dp from "../../assets/images/dp.jpg";
import baseUrl from '../../api/serverAPI';

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

const PeopleList = ({user}) => {
  //const user = useSelector((state) => state.user);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isFollowingLoading, setIsFollowingLoading] = React.useState(true);
  const [peopleData, setPeopleData] = React.useState([]);

  useEffect(() => {
    setIsFollowingLoading(true);
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getFollowing/${user._id}`);
        setPeopleData(res.data.following);
      }
      catch (err) {
        console.log(err);
      }
      finally{
        setIsFollowingLoading(false);
      }
    }
    
    fetchPeople();
  }
  , []);
  
  return (
    <div className="people-list">
      <h4 className="">Following List :</h4>
      {isFollowingLoading ? (
        <p>Loading...</p>
      ) : (
        peopleData.length>0  ? (
          peopleData.map((person, index) => (
            <a href={`/profile/${person._id}`} style={{color:"black", textDecoration:"none"}}>
            <PersonCard
              key={index}
              dp={person.image.url?person.image.url:dp}
              username={person.name}
              about={person.bio?person.bio:"No bio to show."}
            />
            </a>
          ))
        ) : (
          <p>No Following to show here.</p>
        )
      )}
      {console.log('peopleData:', peopleData)}
    </div>
  );
  
};

export default PeopleList;