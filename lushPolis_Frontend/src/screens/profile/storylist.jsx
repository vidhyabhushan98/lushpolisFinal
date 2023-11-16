import React, { useEffect } from "react";
import MultiActionAreaCard from "./story.jsx"; // Assuming that MultiActionAreaCard component is in the same directory
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../api/serverAPI";

const CardList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setDiaries] = useState([]);
  const id = useParams();
  
  useEffect(() => {
    const fetchDiaries = async () => {
      console.log("in fetch diaries",id.id);
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${baseUrl}/fetchAllUserDiaries`,
          { userId: id.id }
        );
        console.log(res.data.diaryDetails);
        setDiaries(res.data.diaryDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiaries();
  }, []);

  return (
    <>
      {/* <p><b>THIS FEATURE IS YET TO BE IMPLEMENTED</b></p> */}
  
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cardData.length === 0 ? (
          <p>No diaries to show</p>
        ) : (
          <>
            {cardData.map((card) => (
              <React.Fragment key={card.id}>
                {console.log(card.userId, user._id)}
                {card.userId === user._id ? (
                  <a href={"/diaries/" + card._id}>
                    <MultiActionAreaCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      id={card._id}
                      imageUrl={
                        card.plantImage[0].url
                          ? card.plantImage[0].url
                          : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                      }
                    />
                  </a>
                ) : (
                  <MultiActionAreaCard
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    id={card._id}
                    imageUrl={
                      card.plantImage[0].url
                        ? card.plantImage[0].url
                        : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
  
                  };
export default CardList;
