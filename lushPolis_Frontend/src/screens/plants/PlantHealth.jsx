import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./PlantHealth.css";
import NavBar from "../components/Navbar.jsx";
import baseUrl from "../../api/serverAPI";

function HealthAssessment() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const scrollToTopRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileSelected(true);
    setResponse(null);
  };

  const scrollToTop = () => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component is loaded
    scrollToTop();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/plants/health", formData, {
        baseURL: `${baseUrl}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;
      console.log(response);
      console.log(responseData);
      if (responseData.is_plant < 0.5) {
        setResponse(
          "High chance that the image doesn't contain a plant. Try from another angle or take a picture of a plant."
        );
      } else {
        setResponse(responseData);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bgofapi111">
        <div style={{ paddingTop: "5rem" }} ref={scrollToTopRef}>
          <div className="PlantApp" style={{ padding: "4rem" }}>
            <h2>Upload an Image for Plant Health Assessment</h2>
            <br />
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
              className={
                isFileSelected
                  ? "file-selected plant-button-like-selected"
                  : "plant-button-like"
              }
            />
            <br />
            <br />
            <div style={{ display:"flex", justifyContent: "center", alignContent: "center" }}>
              {file && (
                <img
                  className="disease-image-preview"
                  src={URL.createObjectURL(file)}
                  alt="Plant preview"
                />
              )}
            </div>
            <br />
            <br />
            <button
              className="plant-fileupload-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Access Health
            </button>
            {isLoading && <p>Assessing health...</p>}
            {response && isFileSelected && !isLoading && (
              <div className="health-assessment-results-container">
                <h3>Assessment Results:</h3>
                {response && response.is_plant > 0.5 ? (
                  <>
                    <p className="disease-p">
                      Probability that uploaded plant is Healthy:{" "}
                      {((response?.is_healthy || 0) * 100).toFixed(1)}%
                    </p>
                    <p className="disease-p">
                      Probability that uploaded image is Plant:{" "}
                      {((response?.is_plant || 0) * 100).toFixed(1)}%
                    </p>
                    <br />
                    <div className="disease-suggestions">
                      {response?.disease_suggestions?.length > 0 ? (
                        response.disease_suggestions.map((disease, index) => (
                          <div key={index} className="disease-item">
                            <img
                              src={disease.image}
                              alt={disease.name}
                              className="disease-image"
                            />
                            <p className="disease-name">{disease.name}</p>
                            <p className="disease-probability">
                              Probability:{" "}
                              {(disease.probability * 100).toFixed(1)}%
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No health assessment suggestions found.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="no-plant-alert">
                    <strong>
                      High chance that the image doesn't contain a plant. Try
                      from another angle or take a picture of a plant.
                    </strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthAssessment;
