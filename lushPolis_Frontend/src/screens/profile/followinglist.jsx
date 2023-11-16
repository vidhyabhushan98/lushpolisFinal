import React from "react";
import ReactDOM from "react-dom/client";
import "./followinglist.css";
import dp from "../../assets/images/dp.jpg";


const FollowingList = ({ peopleData, setActiveItem }) => {
const profile = '/profile/'

const handleViewAll = () => {
  setActiveItem('Ffollowingg');
}


  return (
    <div>
      <div class="s by">
        <span class="am fh fi ah fj bq">Following</span>
        <ul className="dg or s">
          {peopleData.length === 0 ?(
          <>
          <i>
          <p>No Following to show</p></i></>):(
            
            <>
          {peopleData.map((user, index) => (
            <>
            <br></br>
            <li className="n o di" key={index}>
              <a
                className="az ak ba bb bc an bd w ao ap aq ar as at au pa pb pc"
                rel="noopener follow"
                href={profile+user._id}
              >
                <div className="pd n">
                  <div className="pe s">
                    <div className="s by">
                      <img
                        alt={user.name}
                        className="s cm ch dm dn cn"
                        src={user && user.image && user?.image.url ? user.image.url : dp}
                        width="20"
                        height="20"
                        loading="lazy"
                      />
                      <div className="cg ch s dm dn ck u bf ga"></div>
                    </div>
                  </div>
                  <p className="am b al ah gb ii gd ge gf gh gi aj">
                    {user.name}
                  </p>
                </div>
              </a>
              <div
                className="bs"
                aria-hidden="false"
                aria-describedby={`creatorInfoPopover-${user.id}`}
                aria-labelledby={`creatorInfoPopover-${user.id}`}
                aria-haspopup="dialog"
              >
                <button
                  className="az ak ba bb bc an bd pf ao ap aq ar as at au bj pg ph oe pi"
                  aria-controls={`creatorInfoPopover-${user.id}`}
                  aria-expanded="false"
                >
                </button>
              </div>
            </li>
            </>
          ))
        }
        </>
        )}
        </ul>
        <p class="am b al ah aj">
          <a
            class="az ak ba bb bc an bd w ao ap aq ar as at au"
            rel="noopener follow"
            onClick = {handleViewAll} 
          >
            View All
          </a>
        </p>
      </div>
    </div>
  );
};

export default FollowingList;
