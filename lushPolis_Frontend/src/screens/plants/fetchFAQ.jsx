import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../api/serverAPI';

function FetchFAQ({ plantName }) {
  const [faqData, setFAQData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQData = async (plantName) => {
      try {
        const apiUrl = `${baseUrl}/plants/faq/${plantName}`;
        const response = await axios.get(apiUrl, {
          baseURL: `${baseUrl}`,
        });
        setFAQData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        setLoading(false);
      }
    };

    fetchFAQData(plantName);
  }, [plantName]);

  if (loading) {
    return <div className='faq-loading'>Loading...</div>;
  }

  return (
    <div style={{padding:'6rem'} }>
      <h2>FAQs for {plantName}</h2>
      {faqData.length > 0 ? (
        <ul>
          {faqData.map((item, index) => (
            <li key={index}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <div className="tags">Tags: {item.tags}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No FAQs found for {plantName}</p>
      )}
    </div>
  );
}

export default FetchFAQ;
