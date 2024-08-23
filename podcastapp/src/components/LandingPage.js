import React, { useState, useEffect } from 'react';
import Carousel from './ShowCarousel';

const LandingPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch shows or get data from an API
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  return (
    <div>
      <Carousel shows={shows} />
    </div>
  );
};

export default LandingPage;
