import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../api/serverAPI';

function FetchMoreDetails({ plantName }) {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchmoredetails = async (plantName) => 
        {
            console.log('plantName', plantName);
            try {
                const apiUrl = `${baseUrl}/plants/search/${plantName}`;
                console.log(apiUrl);
                const response = await axios.get(apiUrl, {
                    baseURL: `${baseUrl}`,
                });

                setResponse(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching More Details:', error);
                setLoading(false);
            }
        };

        fetchmoredetails(plantName);
    }, [plantName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="search-results" style={{padding:'6rem'} }>
            {response && (
                <div className="plant-details">
                    <img
                        src={response.image || 'placeholder-image-url'}
                        alt={response.type || 'Data not available in API'}
                        className="plant-top-center-image"
                    />
                    <p><strong>Common Names:</strong> {response.commonName || 'Data not available in API'}</p>
                    <p><strong>Scientific Name:</strong> {response.scientificName?.join(', ') || 'Data not available in API'}</p>
                    <p><strong>Origin:</strong> {response.origin?.join(', ') || 'Data not available in API'}</p>
                    <p><strong>Other Names:</strong> {response.other_name || 'Data not available in API'}</p>
                    <p><strong>Dimension:</strong> {response.dimension || 'Data not available in API'}</p>
                    <p><strong>Plant Anatomy:</strong> {response.plant_anatony || 'Data not available in API'}</p>
                    <p><strong>Propagation:</strong> {response.propagation || 'Data not available in API'}</p>
                    <p><strong>Watering:</strong> {response.watering || 'Data not available in API'}</p>
                    <p><strong>Type:</strong> {response.type || 'Data not available in API'}</p>
                    <p><strong>Depth Watering Requirement:</strong> {response.depth_watering_requirement || 'Data not available in API'}</p>
                    <p><strong>Volume Water Requirement:</strong> {response.volume_water_requirement?.join(', ') || 'Data not available in API'}</p>
                    <p><strong>Sunlight:</strong> {response.sunlight?.join(', ') || 'Data not available in API'}</p>
                    <p><strong>Maintenance:</strong> {response.maintenance || 'Data not available in API'}</p>
                    <p><strong>Growth Rate:</strong> {response.growth_rate || 'Data not available in API'}</p>
                    <p><strong>Care Level:</strong> {response.care_level || 'Data not available in API'}</p>
                    <p><strong>Pruning Month:</strong> {response.pruning_month || 'Data not available in API'}</p>
                    <p><strong>Pruning Count:</strong> {response.pruning_count || 'Data not available in API'}</p>
                    <p><strong>Pruning Interval:</strong> {response.pruning_interval || 'Data not available in API'}</p>
                    <p><strong>Medicinal:</strong> {response.medicinal ? 'Yes' : 'No'}</p>
                    <p><strong>Poisonous to Humans:</strong> {response.poisonous_to_humans || 'Data not available in API'}</p>
                    <p><strong>Poisonous to Pets:</strong> {response.poisonous_to_pets || 'Data not available in API'}</p>
                    <p><strong>Description:</strong> {response.description || 'Data not available in API'}</p>
                    <br />
                </div>
            )}
        </div>
    );
}

export default FetchMoreDetails;
