import "./plantscss.css";
import Navbar from "../components/Navbar.jsx";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import plantiden from "../../assets/images/plantiden.png";
import "./api.css";
import planthealth from "../../assets/images/planthealth.png";
import plantsearch from "../../assets/images/plantsearch.png";

function Plants() {
  return (
    <>
      <Navbar />
      <div className="bgofapi" style={{ height: "auto" }}>
        <div className="PlantApp" style={{ padding: "6rem" }}>
          <header className="Plantheader">
            <h1>Plant Identification and Search</h1>
          </header>

          <ul className="Plantnav-links">
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="Demo_demoDescription__VOYlz Demo_demoCard__7kbhs ">
                  <h2>How to identify a plant?</h2>
                  <p className="para">
                    We use cutting edge methods of machine learning (AKA
                    artificial intelligence) and train customized deep
                    convolutional neural networks to ensure the best possi ble
                    results. We estimate that in 90% of cases, we offer the
                    right answer. Check our blog for a more detailed evaluation.
                  </p>
                  <div class="Demo_imgContainer__8WxwM">
                    <img src={plantiden} />
                  </div>
                </div>
                <div style={{ paddingLeft: "2rem" }}>
                  <Link to="/plants/identification" className="Plantnav-button">
                    Plant Identification
                  </Link>
                </div>
              </div>
            </li>
            <br />
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="Demo_demoDescription__VOYlz Demo_demoCard__7kbhs ">
                  <h2>How to identify a plant?</h2>
                  <p className="para">
                    We use cutting edge methods of machine learning (AKA
                    artificial intelligence) and train customized deep
                    convolutional neural networks to ensure the best possi ble
                    results. We estimate that in 90% of cases, we offer the
                    right answer. Check our blog for a more detailed evaluation.
                  </p>
                  <div class="Demo_imgContainer__8WxwM">
                    <img src={plantsearch} />
                  </div>
                </div>
                <div style={{ paddingLeft: "2rem" }}>
                  <Link to="/plants/search" className="Plantnav-button">
                    Plant Search
                  </Link>
                </div>
              </div>
            </li>
            <br />
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="Demo_demoDescription__VOYlz Demo_demoCard__7kbhs ">
                  <h2>How to identify a plant?</h2>
                  <p className="para">
                    We use cutting edge methods of machine learning (AKA
                    artificial intelligence) and train customized deep
                    convolutional neural networks to ensure the best possi ble
                    results. We estimate that in 90% of cases, we offer the
                    right answer. Check our blog for a more detailed evaluation.
                  </p>
                  <div class="Demo_imgContainer__8WxwM">
                    <img src={planthealth} />
                  </div>
                </div>
                <div style={{ paddingLeft: "2rem" }}>
                  <Link
                    to="/plants/health_assessment"
                    className="Plantnav-button"
                  >
                    Health Assessment
                  </Link>
                </div>
              </div>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Plants;
