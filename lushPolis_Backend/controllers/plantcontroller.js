const mongoose = require('mongoose');
const { getaccessToken, getPlantDetailsMiddleware, fetchPlant, fetchPlantdetails, fetchcareGuide , fetchFAQdetails, diseases} = require('../middleware/plantMiddleware');
const axios = require('axios').default;
const fileUpload = require('express-fileupload');
require('dotenv').config();

// const getPlants = async (req, res) => {
//     const plants = await Plant.find({}).sort({ createdAt: -1 });
//     res.status(200).json(workouts);
// }

const getPlant = async (req, res) => {

    try{
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No image file uploaded.' });
          }
      
          const image = req.files.image;
          const imageBuffer = image.data.toString('base64');
    
        var data = JSON.stringify({
            "images": [imageBuffer],
            "latitude": 49.207,
            "longitude": 16.608,
            "similar_images": true
        });
        const API_KEY = process.env.API_KEY;
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://plant.id/api/v3/identification',
            headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            data: data
        };
        var responseData;
        axios(config)
            .then(async function (response) {
                try {
                    Data = JSON.stringify(response.data);
                    console.log(Data);
                    const access_token = getaccessToken(Data);
                    console.log(access_token);
                    const extractedData = await getPlantDetailsMiddleware(access_token);
                    console.log(extractedData);
                    res.status(200).json(extractedData);
                    console.log('success');
                    console.log(extractedData);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'An error occurred while processing plant details.' });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch{
        res.status(500).json({ error: 'An error occurred while sending the file details.' });
        console.error(error);
        next(error);
    }
}

// const getPlantdetails = async (access_token) => {
//     const { access_token } = req.body;
//     console.log(access_token);
//     const API_KEY = process.env.API_KEY;
//     var config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://plant.id/api/v3/identification/${access_token}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering &language=en`,
//         headers: {
//             'Api-Key': API_KEY,
//             'Content-Type': 'application/json'
//         }
//     };

//     axios(config)
//         .then(function (response) {
//             Data = JSON.stringify(response.data);
//             const extractedData = jsonparsedetails(Data);
//             res.status(200).json(extractedData);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

const searchPlant = async (req, res) => {
    const { plantName } = req.params;
    try {
        console.log(plantName);
        const plant = await fetchPlant(plantName);
        console.log(plant);
        const data = await fetchPlantdetails(plant.plantId);
        console.log(data);
        res.status(200).json(data);
    }
    catch {
        res.status(500).json({ error: 'An error occurred while processing plant details.' });
    }
}

const fetchcareGuidedetails = async (req, res) => {
    const { plantName } = req.params;
    try{
        const plant_careguide = await fetchcareGuide(plantName);
        console.log(plant_careguide);
        res.status(200).json(plant_careguide);
    }
    catch{
        res.status(500).json({ error: 'An error occurred while processing plant details.' });
    }
}

const fetchFAQ = async (req,res) =>{
    const { plantName } = req.params;
    try{
        const plant_faq = await fetchFAQdetails(plantName);
        console.log(plant_faq);
        res.status(200).json(plant_faq);
    }
    catch{
        res.status(500).json({ error: 'An error occurred while processing plant details.' });
    }
}


const getHealth = async (req,res) =>{
    try{
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No image file uploaded.' });
          }
          console.log("files ...");
          const image1 = req.files.image;
          const imageBuffer = image1.data.toString('base64');
        const image=process.env.IMAGE;
        var data = JSON.stringify({
            "images": imageBuffer,
            "latitude": 49.207,
            "longitude": 16.608,
            "similar_images": true
        });
        const API_KEY = process.env.API_KEY;
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://plant.id/api/v3/health_assessment',
            headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            data: data
        };
        var responseData;
        axios(config)
            .then(async function (response) {
                try {
                    Data = (response.data);
                    console.log(Data.result);
                    const extractedData = await diseases(Data);
                    console.log(extractedData);
                    res.status(200).json(extractedData);
                    // console.log('success');
                    // console.log(extractedData);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'An error occurred while processing disease details.' });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch{
        res.status(500).json({ error: 'An error occurred while sending the disease request' });
        // console.log(error);
        // //next(error);
    }
}
module.exports = { getPlant, searchPlant, fetchcareGuidedetails, fetchFAQ , getHealth};