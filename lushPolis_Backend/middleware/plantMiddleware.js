const axios = require('axios');
require('dotenv').config();

const getaccessToken = (jsondata) => {
    const responseData = JSON.parse(jsondata);
    const access_token = responseData.access_token;
    console.log(access_token);
    // const extractedData = {
    //     "access_token": responseData.access_token,
    //     "isplantprobability": responseData.result.is_plant?.probability,
    //     "suggestions": responseData.result.classification?.suggestions?.map(suggestion => ({
    //         "name": suggestion.name,
    //         "probability": suggestion.probability
    //     })) || [],
    //     "similar_images": responseData.result.classification?.similar_images?.map(image => ({
    //         "url": image.url
    //     })) || []
    // };
    return access_token;
}

const jsonparsedetails = (jsondata) => {
    const responseData = JSON.parse(jsondata);
    const extractedData = {
        "access_token": responseData.access_token,
        "isplantprobability": responseData.result.is_plant?.probability,
        "suggestions": responseData.result.classification?.suggestions?.map(suggestion => ({
            "name": suggestion.name,
            "probability": suggestion.probability,
            "image": suggestion.details.image.value,
            "similar_images": suggestion.similar_images.map(image => image.url),
            "common_names": suggestion.details.common_names,
            "taxonomy": suggestion.details.taxonomy,
            "wikipedia_url": suggestion.details.url,
            "rank": suggestion.details.rank,
            "description": suggestion.details.description,
            "synonyms": suggestion.details.synonyms,
            "edible_parts": suggestion.details.edible_parts,
        })) || [],
    };
    return extractedData;
}

async function getPlantDetailsMiddleware(access_token) {
    const API_KEY = process.env.API_KEY;
    const apiUrl = `https://plant.id/api/v3/identification/${access_token}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering&language=en`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Api-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const Data = JSON.stringify(response.data);
        const extractedData = jsonparsedetails(Data); // Assuming jsonparsedetails is a function you have defined
        return extractedData;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching plant details.');
    }
}

async function fetchPlant(searchText) {
    const apiKey = process.env.PERENUAL_API_KEY; // Replace with your actual API key
    const apiUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${searchText}`;

    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const result = response.data;
            console.log(result);
            const data = result.data;

            if (data.length > 0) {
                const firstPlant = data[0];
                const plantId = firstPlant.id;
                const commonName = firstPlant.common_name;
                const scientificName = firstPlant.scientific_name[0];
                return { "plantId": plantId, "commonName": commonName, "scientificName": scientificName };
            } else {
                throw new Error('No plants found');
            }
        } else {
            throw new Error('Failed to load plants');
        }
    } catch (error) {
        throw new Error(`Failed to get plant name 2: ${error.message}`);
    }
}


async function fetchPlantdetails(plantId) {
    const apiKey = process.env.PERENUAL_API_KEY; // Replace with your actual API key
    const apiUrl = `https://perenual.com/api/species/details/${plantId}?key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const result = response.data;
            console.log(result);
            console.log('hi');
            console.log(result.plant_anatony?.join(', '));
            const detailsMap = {
                commonName: result.common_name,
                scientificName: result.scientific_name,
                origin: result.origin,
                other_name: result.other_name?.join(', '),
                type: result.type,
                dimension: result.dimension,
                plant_anatony: result.plant_anatony?.map(item => `${item.part}: ${item.color.join(', ')}`).join(', '), // Process plant_anatomy
                propagation: result.propagation?.join(', '),
                watering: result.watering,
                depth_watering_requirement: result.depth_watering_requirement,
                volume_water_requirement: result.volume_water_requirement,
                maintenance: result.maintenance,
                growth_rate: result.growth_rate,
                care_level: result.care_level,
                medicinal: result.medicinal,
                sunlight: result.sunlight,
                pruning_month: result.pruning_month?.join(', '),
                pruning_count: result.pruning_count.amount,
                pruning_interval: result.pruning_count.interval,
                poisonous_to_humans: result.poisonous_to_humans,
                poisonous_to_pets: result.poisonous_to_pets,
                description: result.description,
                image: result.default_image.original_url,
                // Add other fields you want to include in the map
              };
              
            return detailsMap;
        } else {
            throw new Error('Failed to load plant details');
        }
    } catch (error) {
        console.error('Error fetching plant details:', error);
        throw error;
    }
}

const fetchcareGuide = async (plantName) => {
    console.log("here");
    const apiKey = process.env.PERENUAL_API_KEY; // Replace with your actual API key
    const apiUrl = `https://perenual.com/api/species-care-guide-list?key=${apiKey}&q=${plantName}&type=watering,sunlight`;
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        if (response.status === 200) {
            const result = response.data;
            console.log(result.data);
            console.log('hi');
            console.log(result)
            //add null handlers
            console.log('hi2');
            console.log(result.data[0]);
            const watering = (result.data[0]?.section[0]?.description) || 'N/A';
            const sunlight = (result.data[0]?.section[1]?.description) || 'N/A';

            const careGuide = { "watering": watering, "sunlight": sunlight };
            return careGuide;
        }
    }
    catch (error) {
        console.error('Error fetching plant details:', error);
        throw error;
    }
}

const fetchFAQdetails = async (plantName) => {
    const apiKey = process.env.PERENUAL_API_KEY; // Replace with your actual API key
    const apiUrl = `https://perenual.com/api/article-faq-list?key=${apiKey}&q=${plantName}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const result = response.data;
            const data = result.data;

            const FAQ = data.map((element) => ({
                question: element.question,
                answer: element.answer,
                tags: element.tags.join(', '),
            }));
            return FAQ;
        }
    }
    catch (error) {
        console.error('Error fetching plant details:', error);
        throw error;
    }
}

const diseases = (jsondata) => {
    const extractedData = {
        is_healthy: jsondata.result.is_healthy.probability,
        is_plant: jsondata.result.is_plant.probability,
        disease_suggestions: jsondata.result.disease.suggestions.map((disease) => ({
          name: disease.name|| 'N/A',
          probability: disease.probability|| 'N/A',
          image: disease.similar_images[0].url|| 'N/A'
        })),
      };
    return extractedData;
}


module.exports = { getaccessToken, getPlantDetailsMiddleware, fetchPlant, fetchPlantdetails, fetchcareGuide, fetchFAQdetails, diseases };