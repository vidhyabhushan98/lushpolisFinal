import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../api/serverAPI';

function FetchCareGuide({ plantName }) {
  console.log('plantName', plantName);
  const [careData, setCareData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantData = async (plantName) => {
      try {
        const apiUrl = `${baseUrl}/plants/careguide/${plantName}`;
        const response = await axios.get(apiUrl, {
          baseURL: `${baseUrl}`,
        });
        setCareData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching care guide data:', error);
        setLoading(false);
      }
    };

    fetchPlantData(plantName);
  }, [plantName]);

  if (loading) {
    return <div className='careguide-loading'>Loading...</div>;
  }

    return (
      <div style={{padding:'6rem'} }>
        <h2>Care Guide for {plantName}</h2>
        {careData ? (
          <div>
            <p><strong>Watering details : </strong></p>
            <p>{careData.watering}</p>
            <p><strong>Sunlight details : </strong></p>
            <p>{careData.sunlight}</p>
            {/* Add more care guide details here as needed */}
          </div>
        ) : (
          <p>No care guide data available for {plantName}</p>
        )}
      </div>
    );
    
}

export default FetchCareGuide;
