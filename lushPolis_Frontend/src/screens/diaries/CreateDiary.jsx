import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './createDiary.css'
import diarybg from '../../assets/images/diarybg2.jpg'
import whitebg from '../../assets/images/whitebg.jpg'
import baseUrl from '../../api/serverAPI';

const CreateDiary = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [plantName,setPlantName] = useState("");
    const [plantSpecies,setPlantSpecies] = useState("");
    const [plantImage,setPlantImage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const userName = user.name;
    let id = ""
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPlantImage(reader.result);
        }
    }

    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true)
            if(!title || !description || !plantName || !plantSpecies || !plantImage){
                alert("Please enter all the details");
                return;
            }
            //console.log(userId, title,userName, description,plantImage,plantName,plantSpecies);
            const {data} = await axios.post(`${baseUrl}/createNewDiaryDetails`, 
            {userId, title,userName, description,plantImage,plantName,plantSpecies})
            if  (data.success === true){
                setTitle('');
                setDescription('');
                setPlantSpecies('');
                setPlantImage('');
                setPlantName('');
            }
            id = data.diaryDetails._id;
            console.log(data);
            navigate('/diaries/'+id);
        } catch (error) {
            console.log(error.toString())
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
        <NavBar/>
        <div style={{ backgroundImage: `url(${diarybg})`}}>

        <div className="container marketing" 
        //</>style={{ backgroundImage: `url(${diarybg})` }}
        >
        <div className="product-form" style={{ backgroundImage: `url(${whitebg})`}}>
        <h2>Enter New Diary Details</h2>
        <div className="form-content"  >
        
            <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" onSubmit={submitForm}>
            
            <div className="form-group">
            <label className="form-label" htmlFor="form4Example1">Diary Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} type="text" id="form4Example1" className="form-control"  value={title}/>
                
            </div>

            
            <div className="form-group">
                <label className="form-label" htmlFor="form4Example2">Diary Description </label>
                <textarea  onChange={(e)=>setDescription(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={description}/>
            </div>

            <div className="form-group">
            <label className="form-label" htmlFor="form4Example2">Plant Name</label>
                <textarea  onChange={(e)=>setPlantName(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={plantName}/>
               
            </div>

             
            <div className="form-group">
            <label className="form-label" htmlFor="form4Example2">Plant Species </label>
                <textarea  onChange={(e)=>setPlantSpecies(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={plantSpecies}/>
               
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="form4Example2">Image</label>
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                
            </div>
            <img className="img-fluid" src={plantImage} alt="" />
             {!isLoading ? (
                <button type="submit" className="add-product-button" onClick={submitForm}>
                    Create Diary
                </button>
                ) : (
                <div>
                    Please Wait. Diary is being Created</div>
                )}
         </form>
         </div>
        </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default CreateDiary;
