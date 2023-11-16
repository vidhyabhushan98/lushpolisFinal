import plantIden from "../../assets/images/plantiden.png";
import planthealth from "../../assets/images/planthealth.png";
import ecommerce_circle from "../../assets/images/ecommerce_circle.svg";
import styles from "./syles.module.css";
import { logout } from "../../auth/auth";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import "./logout.css";
import intropic from "../../assets/images/intropic.svg";
import watering from "../../assets/images/watering.gif";
import communities from "../../assets/images/communities.jpg";
import plantinteraction from "../../assets/images/plantinteraction.gif";


function Logout() {
  return (
    <>
      <Navbar />
      <div className="container marketing3">
        <div
          className="container-fluid row flex-column flex-md-row align-items-center Header_header__0EKlr"
          id="ma"
        >
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="Header_content__ZU2l5  d-flex flex-column justify-content-around align-items-md-start align-items-center ">
              <h1 className="Header_heading__CDDLz">
                <i>LushPolis</i>
              </h1>
              <p className="Header_description__HXj7d ">
                Welcome to Lushpolis - Your Green Oasis! Dive into a world where
                gardening meets innovation. From personalized plant care with
                our assistant chatbot to sharing your green journey in our
                blogging community, discovering and purchasing plants in our
                e-commerce section, and connecting with fellow enthusiasts in
                group chats and social media. Lushpolis is your go-to
                destination for all things gardening, effortlessly bringing the
                joy of cultivating nature to your fingertips.
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center px-5 p-0 undefined">
            <img
              src={intropic}
              width="100%"
              height="50%"
              className="Header_headerPic__7K7sR"
            />
          </div>
        </div>
        {/* <br></br> */}
        <hr className="featurette-divider" />
        {/* <br></br> */}
        <div className="row">
          <div className="col-lg-4">
            <div className="rowfediv">
              <img
                className="rounded-circle"
                src={plantIden}
                alt="Generic placeholder image"
                width="140"
                height="140"
              ></img>
            </div>
            <h2>Plant Identification</h2>
            <br></br>
            <p>
              Snap, Identify, Grow - effortlessly unravel the secrets of your
              plants with our image-based identification feature.
            </p>
            <br></br>
            <br></br>
            <p>
              <a href="/plants">
                <button className="Header_pricingBtn__wDO4s">
                  Click Pics »
                </button>
              </a>
            </p>
          </div>
          <div className="col-lg-4">
            <div className="rowfediv">
              <img
                className="rounded-circle"
                src={planthealth}
                alt="Generic placeholder image"
                width="140"
                height="140"
              ></img>
            </div>
            <h2>Disease Detection</h2>
            <br></br>
            <p>
              Nurture your garden with confidence. Instantly assess your plants'
              health and detect issues for a flourishing green paradise.
            </p>
            <br></br>
            <p>
              <a href="/plants">
                <button className="Header_pricingBtn__wDO4s">
                  Find diseases »
                </button>
              </a>
            </p>
          </div>
          <div className="col-lg-4">
            <div className="rowfediv">
              <img
                className="rounded-circle"
                src={ecommerce_circle}
                width="140"
                height="140"
              ></img>
            </div>
            <h2>E-Market</h2>
            <p>
              Transform your garden with just a click! Explore a curated
              selection of high-quality seeds, plants, finest tools, resources
              and other gardening essentials in our e-commerce section.
            </p>
            <br></br>
            <br></br>
            <p>
              <a href="/shop">
                <button className="Header_pricingBtn__wDO4s">
                  Buy Items »
                </button>
              </a>
            </p>
          </div>
        </div>
        {/* <br></br> */}
        <hr className="featurette-divider" />
        {/* <br></br> */}
        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading">
            Grower's Corner:{" "}
              <span className="text-muted">Share, Learn, and Chronicle Your Gardening Journey.</span>
            </h2>
            <br></br>
            <p className="lead">
            Share your gardening journey with the world through our blogging
              feature. Chronicle your successes, share tips, and connect with a
              community of fellow green thumbs. Cultivate knowledge and
              inspiration as your gardening story unfolds.
            </p>
            <p>
                <br></br>
              <a href="/explore">
                <button className="Header_pricingBtn__wDO4s">
                  Explore Blogs »
                </button>
              </a>
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              className="featurette-image img-fluid mx-auto"
              alt="500x500"
              src={watering}
              data-holder-rendered="true"
              style={{ width: "500px", height: "500px" }}
            ></img>
          </div>
        </div>
        {/* <br/> */}
        <hr className="featurette-divider" />
        {/* <br></br> */}
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">
            GreenThumb Companion:{" "}
              <span className="text-muted">Instant Gardening Guidance with our Chatbot</span>
            </h2>
            <br></br>
            <p className="lead">
            Meet your virtual gardening companion! Our assistant chatbot is
              here to provide instant, expert guidance. From planting tips to
              troubleshooting, get personalized advice at your fingertips.
              Gardening wisdom, right when you need it.
            </p>
            <p>
                <br></br>
              <a href="/assistant">
                <button className="Header_pricingBtn__wDO4s">
                  Get Answers »
                </button>
              </a>
            </p>
          </div>
          <div className="col-md-5">
            <img
              className="featurette-image img-fluid mx-auto"
              alt="500x500"
              style={{ width: "500px", height: "500px" }}
              src={plantinteraction}
              data-holder-rendered="true"
            ></img>
          </div>
        </div>
        {/* <br></br> */}
        <hr className="featurette-divider" />
        {/* <br></br> */}
        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading">
            Community Cultivation:{" "}
              <span className="text-muted">Connect and Share in our Group Chat</span>
            </h2>
            <br></br>
            <p className="lead">
            Nurture a sense of community with our group chat feature. Connect
              with fellow garden enthusiasts, share experiences, and seek
              advice. Whether you're a novice or a seasoned pro, the group chat
              is your space to cultivate friendships and collective wisdom.
            </p>
            <p>
                <br></br>
              <a href="/chat">
                <button className="Header_pricingBtn__wDO4s">
                  Start Chatting »
                </button>
              </a>
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              className="featurette-image img-fluid mx-auto"
              alt="500x500"
              src={communities}
              data-holder-rendered="true"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        </div>
        {/* <br></br> */}

        {/* <br></br> */}
      </div>
      <br></br>
      <Footer />
    </>
  );
}

export default Logout;
