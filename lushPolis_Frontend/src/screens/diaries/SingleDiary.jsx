import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import Box from './box';
import baseUrl from '../../api/serverAPI';

const SingleDiary = () => {

    const detailsId = useParams();
    const [diaryDetails, setDiaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user= JSON.parse(localStorage.getItem("user"));
    
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());

    

    const fetchDiary = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/fetchDiaryDetails`, {userId: user._id, detailsId: detailsId.id});
            //console.log(res.data.diaryDetails);
            setDiaries(res.data.diaryDetails);
            setServerMsg(res.data.message);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchThisMonthEntries = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/getEntriesByMonth`, {owner: user._id, details: detailsId.id, month: month, year: year});
            //console.log(res.data.message);
            setEntries(res.data.entries);
            setServerMsg(res.data.message);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createThisMonthEntry = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/createDiary`, {owner: user._id, details: detailsId.id, month: new Date().getMonth()+1, year: year});
            //console.log(res.data.message);
            setEntries(res.data.diary.entries);
            setServerMsg(res.data.message);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDiary();
        fetchThisMonthEntries();
    }, []);

    return (
        <>
          <NavBar />
          <div className="container marketing">
            {isLoading ? (
                <>
                {/*show circular loading*/}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                </div>
                </>
            ):(
            <>
            <h1 className="my-4">{diaryDetails.title}</h1>
            <div className="my-4">Plant Name: {diaryDetails.plantName}</div>
            <div className="my-4">Description: {diaryDetails.description}</div>
            <div className="my-4">Date Created: {new Date(diaryDetails.createdAt).toLocaleDateString()}</div>
            <div className="row">
              
            <Box diaryDetails={diaryDetails}/>  
            </div>
            </>
            )}
          </div>
          <Footer />
        </>
      );
}

export default SingleDiary;
