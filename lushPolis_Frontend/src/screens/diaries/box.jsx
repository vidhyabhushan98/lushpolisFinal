import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./box.css";
import {
  rightColumnStyle,
  leftColumnStyle,
  headerStyle,
  containerStyle,
  generateMonthOptions,
  generateYearOptions,
} from "./boxhelper";
import baseUrl from "../../api/serverAPI";

function Box() {
  const { id } = useParams();
  const [detailsId, setDetailsId] = useState(useParams().id);
  const user = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState("false");
  const fileInputRef = useRef(null);

  const [imageUpload, setImageUpload] = useState(false);
  const [newImage, setNewImage] = useState("");

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  //state variables to select dates
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  //state variables to fetch entries for dates
  const [entries, setEntries] = useState([]);
  const [serverMsg, setServerMsg] = useState("");

  //state variables to send messaged
  const [text, setText] = useState("");
  const [sendingEntry, setSendingEntry] = useState(false);

  //days entries
  const [dayEntries, setDayEntries] = useState([]);
  const [dayServerMsg, setDayServerMsg] = useState("");
  const [isDayLoading, setIsDayLoading] = useState("false");
  const scrollContainerRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    //console.log("my file",file);
  };
  
  const handleCancel = () => {
    setNewImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log("setting new image");
      setNewImage(reader.result);
    };
  };

  //util function to scroll to bottom
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };
  
  useEffect(() => {
    // Update the diary id when the `id` parameter changes
    setDetailsId(id);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [dayEntries]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const fetchThisMonthEntries = async () => {
    console.log(
      "fetching entries for month",
      selectedMonth,
      "and year",
      selectedYear
    );

    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/getEntriesByMonth`, {
        owner: user._id,
        details: id,
        month: selectedMonth,
        year: selectedYear,
      });
      console.log("in fetch this month", res.data.entries);
      setEntries(res.data.entries);
      setServerMsg(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDayEntries = async () => {
    setIsDayLoading(true);
    try {
      console.log("selectedDate", selectedDate);
      console.log("month", month);
      console.log("year", year);
      const res = await axios.post(`${baseUrl}/getEntriesByDate`, {
        owner: user._id,
        details: id,
        month: month,
        year: year,
        date: selectedDate,
      });
      console.log(res.data);
      setDayEntries(res.data.entries);
      setDayServerMsg(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDayLoading(false);
    }
  };

  const createThisMonthEntry = async () => {
    setIsLoading(true);
    try {
      console.log("in creating,", id);
      const res = await axios.post(`${baseUrl}/createDiary`, {
        owner: user._id,
        details: id,
        month: new Date().getMonth() + 1,
        year: year,
      });
      setEntries(res.data.diary.entries);
      setServerMsg(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const dayEntryDates = new Set();

  entries?.forEach((entry) => {
    //entry is an array with date property
    dayEntryDates.add(new Date(entry.date).getDate());
  });

  if (!dayEntryDates.has(new Date().getDate())) {
    dayEntryDates.add(new Date().getDate());
  }

  const dates = Array.from(dayEntryDates);
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  dates.sort((a, b) => a - b);

  const handleAddEntry = async() => {
    setSendingEntry(true);
    try {
      console.log("in add entry", newImage)
      console.log("in add entry", user._id)
      await axios
        .post(`${baseUrl}/addEntry`, {
          userId: user._id,
          details: id,
          text: text,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          date: new Date().getDate(),
          img : newImage? newImage : ""
        })
        .then((res) => {
          console.log("add entry res", res.data.entry.entries);
          setDayEntries(res.data.entry.entries);
          setDayServerMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
      
    } catch (err) {
      console.log(err);
    } finally {
      setText("");
      handleCancel();
      setSendingEntry(false);
    }
  };

  useEffect(() => {
    fetchThisMonthEntries();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchDayEntries();
  }, [selectedDate]);

  return (
    <div className="container" style={containerStyle}>
      <header style={headerStyle}>
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {generateMonthOptions()}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {generateYearOptions(2015, new Date().getFullYear())}
            </select>
          </div>
        </div>
      </header>
      {serverMsg === "Diary not found" ? (
        <>
          <div className="alert alert-danger mt-3" role="alert">
            {serverMsg}
          </div>
          {selectedMonth === (new Date().getMonth() + 1).toString() &&
          selectedYear === new Date().getFullYear().toString() ? (
            <button
              className="btn btn-primary float-right mt-3"
              onClick={createThisMonthEntry}
            >
              Create Diary for this month
            </button>
          ) : (
            <>
              {console.log("selected Date here", selectedMonth, "getDate")}
              <div>You haven't created any entry in this month</div>
            </>
          )}
        </>
      ) : (
        <div className="row">
          <div className="col-md-3" style={leftColumnStyle}>
            <ul className="list-group">
              {dates.map((date) => (
                <li
                  key={date}
                  className={`list-group-item ${
                    selectedDate === date ? "active" : ""
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-9" style={rightColumnStyle}>
            <div
              ref={
                selectedDate === new Date().getDate() &&
                selectedMonth === (new Date().getMonth() + 1).toString() &&
                selectedYear === new Date().getFullYear().toString()
                  ? scrollContainerRef
                  : null
              }
              style={{ height: "100%", overflowY: "auto" }}
            >
              {isDayLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {dayServerMsg === "Entries for this date not found" ? (
                    <div className="alert alert-danger mt-3" role="alert">
                      {selectedDate === new Date().getDate()
                        ? "Start your day."
                        : "You Did Not Write Anything on This Day."}
                    </div>
                  ) : (
                    <>
                      {dayEntries.length > 0 ? (
                        dayEntries.map((entry, index) => (
                          <div key={index} className="card mb-3">
                            <div className="outline-primary">
                              <div
                                className="card-body"
                                style={{
                                  fontFamily: "Arial,sans-serif",
                                  fontSize: "14px",
                                }}
                              >
                                {new Date(entry.time).toLocaleTimeString(
                                  "en-IN",
                                  { timeZone: "Asia/Kolkata" }
                                )}
                              </div>
                              <div className="card-header">
                                <p className="card-text">
                                  {entry.text} 
                                </p>
                                <img src={entry.img} alt="" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Make your first entry of the day.</p>
                      )}
                    </>
                  )}
                </>
              )}
              {selectedDate === new Date().getDate() &&
              selectedMonth === (new Date().getMonth() + 1).toString() &&
              selectedYear === new Date().getFullYear().toString() ? (
                <>
                  {console.log(
                    "selected Date here",
                    selectedMonth,
                    "getDate",
                    new Date().getMonth() + 1
                  )}

                  <div className="mt-3">
                    
                      <>
                    <textarea
                      rows="1"
                      className="paddingcomment"
                      cols="60"
                      placeholder="Enter your text here"
                      value={text}
                      onChange={handleInputChange}
                    ></textarea>
                    <input type="file" accept="image/*" onChange={handleImage} ref={fileInputRef} />
                    {newImage?
                    <>
                    <img className="img-fluid" src={newImage} alt="" style={{width:"100px",height:"100px"}}/>
                    <br/>
                    <button className="btn btn-primary mt-2" onClick={handleCancel}>
                    Remove Image
                   </button>
                    </>
                    : <></>}
                    <div>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleAddEntry}
                    >
                      Submit
                    </button>
                    </div>
                    </>
                    {/* ) : (
                    <>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                    <img className="img-fluid" src={newImage} alt="" />
                    <button className="btn btn-primary mt-2" onClick={()=> setNewImage("")}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleImage}
                    >
                      Submit
                    </button>
                    </>
                    )} */}
                  </div>
                </>
              ) : (
                <>
                  <div>-----This was the last entry for the day----</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Box;
