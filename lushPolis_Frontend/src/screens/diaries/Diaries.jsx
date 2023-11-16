import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../api/serverAPI";

const Diaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDiaries = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${baseUrl}/fetchAllUserDiaries`,
          { userId: user._id }
        );
        console.log(res);
        setDiaries(res.data.diaryDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiaries();
  }, []);

  const handleCreateDiary = () => {
    window.location.href = "/createDiary";
  };

  return (
    <>
      <NavBar />
      <div className="container marketing">
        <h1 className="my-4">My Diaries</h1>
        <div style={{display:"flex", flexWrap:"wrap"}}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            diaries.map((diary, index) => (
              <a href={"/diaries/" + diary._id}>
                <div key={index} style={{padding:"0.7rem"}}>
                  <div className="card" style={{width:"15rem", height:"15rem"}}>
                    {diary.plantImage[0].url ? (
                      <img
                        src={diary.plantImage[0].url}
                        width={"300rem"}
                        height={"300rem"}
                        alt="Diary Image"
                      />
                    ) : (
                      <img 
                        src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                        className="card-img-top"
                        alt="Diary Image"
                      />

                    )}
                    <div className="card-body">
                      <h5 className="card-title">{diary.title}</h5>
                      <p className="card-text">{diary.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
        <button
          className="btn btn-primary float-right mt-3" 
          style={{backgroundColor:'green'}}
          onClick={handleCreateDiary}
        >
          Create Diary
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Diaries;
