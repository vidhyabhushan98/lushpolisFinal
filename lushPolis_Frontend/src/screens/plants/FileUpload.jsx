import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";
import Modal from "react-modal";
import FetchFAQ from "./fetchFAQ";
import FetchCareGuide from "./fetchCareGuide";
import FetchMoreDetails from "./fetchMoreDetails";
import Navbar from "../components/Navbar.jsx";
import baseUrl from "../../api/serverAPI";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlant, setIsPlant] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isCareGuideModalOpen, setIsCareGuideModalOpen] = useState(false);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const scrollToTopRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileSelected(true);
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

      const response = await axios.post("/plants/identification", formData, {
        baseURL: `${baseUrl}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;

      if (responseData.isplantprobability < 0.5) {
        setIsUploaded(true);
        setIsPlant(false);
        setResponse(
          "High chance that the image doesn't contain a plant. Try from another angle or take a picture of a plant."
        );
      } else {
        setIsUploaded(true);
        setIsPlant(true);
        setResponse(responseData.suggestions);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlantItemClick = (plant) => {
    plant.expanded = !plant.expanded;

    setSelectedPlant(plant);
  };

  const handleCareGuideClick = () => {
    setIsCareGuideModalOpen(true);
  };

  const closeCareGuideModal = () => {
    setIsCareGuideModalOpen(false);
  };

  const handleFAQClick = () => {
    setIsFAQModalOpen(true);
  };

  const closeFAQModal = () => {
    setIsFAQModalOpen(false);
  };

  const handleMoreDetailsClick = () => {
    setIsMoreDetailsModalOpen(true);
  };

  const closeMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="bgofapi111">
        <div style={{ paddingTop: "5rem" }} ref={scrollToTopRef}>
          <div className="PlantApp" style={{ padding: "4rem" }}>
            <h2>Upload an Image for Plant Identification</h2>
            {/* <label
                htmlFor="file-input"
                className={isFileSelected ? 'file-selected button-like-selected' : 'button-like'}
            >
                {isFileSelected ? 'File Selected' : 'Choose a File'}
            </label> */}

            {/* Apply the "hidden-input" class conditionally */}
            <br />
            <label>
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
            </label>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
               
              }}
            >
                <div style={{border: "3px solid green"}}>
              {file && (
                <img
                  className="disease-image-preview"
                  src={URL.createObjectURL(file)}
                  alt="Plant preview"
                  
                />
                
              )}
              </div>

              </div>

            <br />

            <button
              className="plant-fileupload-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <div className="plant-response">
              {isLoading ? (
                <p>Loading...</p>
              ) : selectedPlant ? (
                <div>
                  <br />
                  <br />
                  <img
                    src={selectedPlant.image}
                    alt={selectedPlant.name}
                    className="selected-plant-image"
                  />
                  <div>
                    <p>
                      <strong>Name:</strong> {selectedPlant.name}
                    </p>
                    {selectedPlant.common_names && (
                      <p>
                        <strong>Common Names:</strong>{" "}
                        {selectedPlant.common_names.join(", ")}
                      </p>
                    )}
                    <p>
                      <strong>Taxonomy:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Class:</strong> {selectedPlant.taxonomy.class}
                      </li>
                      <li>
                        <strong>Genus:</strong> {selectedPlant.taxonomy.genus}
                      </li>
                      <li>
                        <strong>Order:</strong> {selectedPlant.taxonomy.order}
                      </li>
                      <li>
                        <strong>Family:</strong> {selectedPlant.taxonomy.family}
                      </li>
                      <li>
                        <strong>Phylum:</strong> {selectedPlant.taxonomy.phylum}
                      </li>
                      <li>
                        <strong>Kingdom:</strong>{" "}
                        {selectedPlant.taxonomy.kingdom}
                      </li>
                    </ul>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedPlant.description.value}
                    </p>
                    <p>
                      <strong>Wikipedia URL:</strong>{" "}
                      <a
                        href={selectedPlant.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedPlant.wikipedia_url}
                      </a>
                    </p>

                    <button
                      className="plant-moredetails"
                      onClick={handleMoreDetailsClick}
                    >
                      More Details
                    </button>
                    <button
                      className="plant-careguide"
                      onClick={handleCareGuideClick}
                    >
                      Care-Guide
                    </button>
                    <button className="plant-faq" onClick={handleFAQClick}>
                      FAQ
                    </button>
                    <br />
                    <button
                      className="plant-back"
                      style={{ display: "flex" }}
                      onClick={() => setSelectedPlant(null)}
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : isPlant && isUploaded ? (
                <ul className="plant-list">
                  {/* Add a CSS class to the ul element */}
                  {response &&
                    response.map((plant, index) => (
                      <li
                        key={index}
                        onClick={() => handlePlantItemClick(plant)}
                        className="plant-item"
                      >
                        <div>
                          <img
                            className="Plant-imagelist"
                            src={plant.image}
                            alt={plant.name}
                          />
                        </div>
                        <div className="plant-info">
                          <p>
                            <strong>Name: </strong>
                            {plant.name}
                          </p>
                          <br />
                          <p>
                            <strong>Probability: </strong>
                            {(plant.probability * 100).toFixed(1)}%
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <>
                  {isUploaded ? (
                    <p className="no-plant-alert">
                      <strong>
                        High chance that the image doesn't contain a plant. Try
                        from another angle or take a picture of a plant.
                      </strong>
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            {/* more details */}
            <Modal
              isOpen={isMoreDetailsModalOpen}
              onRequestClose={closeMoreDetailsModal}
              contentLabel="More Details Modal"
            >
              {isMoreDetailsModalOpen && (
                <FetchMoreDetails plantName={selectedPlant.name} />
              )}
              <button
                className="close-more-details"
                onClick={closeMoreDetailsModal}
              >
                Close
              </button>
            </Modal>

            {/* Care Guide Modal */}
            <Modal
              isOpen={isCareGuideModalOpen}
              onRequestClose={closeCareGuideModal}
              contentLabel="Care Guide Modal"
            >
              {isCareGuideModalOpen && (
                <FetchCareGuide plantName={selectedPlant.name} />
              )}
              <button className="close-careguide" onClick={closeCareGuideModal}>
                Close
              </button>
            </Modal>

            {/* FAQ Modal */}
            <Modal
              isOpen={isFAQModalOpen}
              onRequestClose={closeFAQModal}
              contentLabel="FAQ Modal"
            >
              {isFAQModalOpen && <FetchFAQ plantName={selectedPlant.name} />}
              <button className="close-faq" onClick={closeFAQModal}>
                Close
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
